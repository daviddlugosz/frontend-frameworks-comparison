using System;
using FrameworkComparisonAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace FrameworkComparisonAPI.Helpers
{
    /// <summary>
    /// 
    /// </summary>
    public class DataContext : DbContext
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="options"></param>
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        /// <summary>
        /// 
        /// </summary>
        public DbSet<Page> Pages { get; set; }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="builder"></param>
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
        }
    }
}
