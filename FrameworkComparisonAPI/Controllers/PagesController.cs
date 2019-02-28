using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using FrameworkComparisonAPI.Services;
using FrameworkComparisonAPI.ViewModel;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace FrameworkComparisonAPI.Controllers
{
    /// <summary>
    /// 
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class PagesController : ControllerBase
    {
        /// <summary>
        /// 
        /// </summary>
        private PagesService PagesService { get; set; }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="pagesService"></param>
        public PagesController(PagesService pagesService)
        {
            PagesService = pagesService;
        }

        // GET api/pages
        /// <summary>
        /// Gets name of every Page
        /// </summary>
        /// <returns>List of Path and Name of all Pages</returns>
        [HttpGet]
        [SwaggerResponse((int)HttpStatusCode.OK, Type = typeof(IEnumerable<PageLinkViewModel>))]
        public ActionResult<IEnumerable<PageLinkViewModel>> ListAllPages()
        {
            return Ok(PagesService.GetAllPagesNames()); 
        }

        // GET api/pages/path
        /// <summary>
        /// Gets Page by Path
        /// </summary>
        /// <param name="path">Path of the Page</param>
        /// <returns>Page</returns>
        [HttpGet("{path}")]
        [SwaggerResponse((int)HttpStatusCode.OK, Type = typeof(PageViewModel))]
        public ActionResult<PageViewModel> Get(string path)
        {
            return Ok(PagesService.GetPage(path));
        }

        // POST api/pages
        /// <summary>
        /// Creates Page
        /// </summary>
        /// <param name="data">Page data</param>
        /// <returns>Created Page</returns>
        [HttpPost]
        [SwaggerResponse((int)HttpStatusCode.Created, Type = typeof(PageViewModel))]
        public async Task<ActionResult<PageViewModel>> Post([FromBody] PageViewModel data)
        {
            var createdPage = await PagesService.AddPageAsync(data);
            var pagePath = PagesService.GetPathToPage(createdPage.Name);
            var pageLink = "/page/" + pagePath;

            return Created(pageLink, createdPage);
        }

        // PUT api/pages
        /// <summary>
        /// Updates Page
        /// </summary>
        /// <param name="path">Path of the Page</param>
        /// <param name="page">Page data</param>
        /// <returns></returns>
        [HttpPut("{path}")]
        [SwaggerResponse((int)HttpStatusCode.NoContent, Description = "Page successfully updated")]
        [SwaggerResponse((int)HttpStatusCode.BadRequest, Description = "Error updating Page")]
        public async Task<ActionResult> Put(string path, [FromBody] PageViewModel page)
        {
            var updated = await PagesService.UpdatePageAsync(page, path);

            if (updated)
                return NoContent();

            return BadRequest();
        }

        // DELETE api/pages/path
        /// <summary>
        /// Deletes Page by Path
        /// </summary>
        /// <param name="path">Path of the Page</param>
        /// <returns></returns>
        [HttpDelete("{path}")]
        [SwaggerResponse((int)HttpStatusCode.NoContent, Description = "Page successfully deleted")]
        [SwaggerResponse((int)HttpStatusCode.BadRequest, Description = "Error deleting Page")]
        public async Task<ActionResult> Delete(string path)
        {
            var removed = await PagesService.RemovePageAsync(path);

            if (removed)
                return NoContent();

            return BadRequest();
        }
    }
}
