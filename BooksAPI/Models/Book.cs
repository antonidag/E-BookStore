using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BooksAPI.Models
{
    public class Book
    {
        public string Author { get; set; }
        public string Title { get; set; }
        public string Genre { get; set; }
        public float Price { get; set; }
        public DateTime Publish_Date { get; set; }
        public string Description { get; set; }
        public int Id { get; set; }
    }
}