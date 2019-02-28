using System.ComponentModel.DataAnnotations;

namespace FrameworkComparisonAPI.Models
{
    /// <summary>
    /// 
    /// </summary>
    public class Page
    {
        /// <summary>
        /// 
        /// </summary>
        [Key]
        public string Path { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string Name { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string HtmlContent { get; set; }
    }
}
