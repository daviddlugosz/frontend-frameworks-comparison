using FrameworkComparisonAPI.Helpers;
using FrameworkComparisonAPI.Models;
using FrameworkComparisonAPI.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace FrameworkComparisonAPI.Services
{
    /// <summary>
    /// 
    /// </summary>
    public class PagesService
    {
        /// <summary>
        /// 
        /// </summary>
        private readonly DataContext _context;

        /// <summary>
        /// 
        /// </summary>
        /// <param name="context"></param>
        public PagesService(DataContext context)
        {
            _context = context;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public IEnumerable<PageLinkViewModel> GetAllPagesNames() => _context.Pages.Select(x => new PageLinkViewModel { Path = x.Path, Name = x.Name });

        /// <summary>
        /// 
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        public PageViewModel GetPage(string path) => _context.Pages
            .Where(x => x.Path.Equals(path, StringComparison.OrdinalIgnoreCase))
            .Select(x => new PageViewModel { Name = x.Name, Content = x.HtmlContent })
            .FirstOrDefault();

        /// <summary>
        /// 
        /// </summary>
        /// <param name="page"></param>
        /// <returns></returns>
        public async Task<PageViewModel> AddPageAsync(PageViewModel page)
        {
            if (string.IsNullOrEmpty(page.Name))
                throw new Exception("Page Name could not be empty!");

            if (_context.Pages.Any(x => x.Name == page.Name))
                throw new Exception($"There is aready Page with Name '{page.Name}', Name of the Page must be unique!");

            var newPage = new Page
            {
                Name = page.Name,
                HtmlContent = page.Content
            };

            newPage.Path = GeneratePathForPage(newPage.Name);

            _context.Pages.Add(newPage);
            await _context.SaveChangesAsync();

            return GetPage(newPage.Path);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="name"></param>
        /// <returns></returns>
        public string GetPathToPage(string name) => _context.Pages.FirstOrDefault(x => x.Name == name)?.Path;

        /// <summary>
        /// 
        /// </summary>
        /// <param name="page"></param>
        /// <param name="path"></param>
        /// <returns></returns>
        public async Task<bool> UpdatePageAsync(PageViewModel page, string path)
        {
            var result = false;

            if (string.IsNullOrEmpty(path))
                throw new Exception("Page Path could not be empty!");

            if (string.IsNullOrEmpty(page.Name))
                throw new Exception("Page Name could not be empty!");

            var exisitngPage = GetPage(path);
            if (exisitngPage == null)
                throw new Exception($"There is no Page with Path '{path}' to update!");

            var dbPage = _context.Pages.First(x => x.Path == path);

            dbPage.Name = page.Name;
            dbPage.HtmlContent = page.Content;

            result = await _context.SaveChangesAsync() == 1;

            return result;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        public async Task<bool> RemovePageAsync(string path)
        {
            var result = false;

            if (string.IsNullOrEmpty(path))
                throw new Exception("Page Path could not be empty!");

            var existingPage = GetPage(path);
            if (existingPage == null)
                throw new Exception($"There is no Page with Path '{path}' to remove!");

            var dbPage = _context.Pages.First(x => x.Path == path);

            _context.Remove(dbPage);

            result = await _context.SaveChangesAsync() == 1;

            return result;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="name"></param>
        /// <returns></returns>
        private string GeneratePathForPage(string name)
        {
            var sb = new StringBuilder();
            var namePath = RemoveDiacritism(Regex.Replace(name, @"\s+", ""));

            if (!_context.Pages.Any(x => x.Path.Equals(namePath, StringComparison.OrdinalIgnoreCase)))
                sb.Append(namePath.ToLower());
            else
            {
                var foundPath = false;
                sb.Append(namePath.ToLower());
                while (!foundPath)
                {
                    sb.Append("_");
                    if (!_context.Pages.Any(x => x.Path.Equals(sb.ToString(), StringComparison.OrdinalIgnoreCase)))
                        foundPath = true;
                }
            }

            return sb.ToString();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="text"></param>
        /// <returns></returns>
        private string RemoveDiacritism(string text)
        {
            var stringFormD = text.Normalize(NormalizationForm.FormD);
            var retVal = new StringBuilder();
            foreach (var t in stringFormD)
            {
                if (System.Globalization.CharUnicodeInfo.GetUnicodeCategory(t) != System.Globalization.UnicodeCategory.NonSpacingMark)
                    retVal.Append(t);
            }

            return Regex.Replace(retVal.ToString().Normalize(NormalizationForm.FormC), 
                "[^a-zA-Z0-9_.]+", "", RegexOptions.Compiled);
        }
    }
}
