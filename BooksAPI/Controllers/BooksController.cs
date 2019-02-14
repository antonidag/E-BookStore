using BooksAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace BooksAPI.Controllers
{
    public class BooksController : ApiController
    {
        BookCatalog catalog;
        public BooksController()
        {
            catalog = new BookCatalog();
        }
        public IHttpActionResult GetTitle(string title)
        {
            return Ok(catalog.GetBooksByTitle(title));
        }
        public IHttpActionResult GetAuthor(string author)
        {
            return Ok(catalog.GetBooksByAuthor(author));
        }
        public IHttpActionResult GetGenre(string genre)
        {
            return Ok(catalog.GetBooksByGenre(genre));
        }
        public IHttpActionResult GetBooks()
        {
            return Ok(catalog.GetAllBooks());
        }
    }
}
