using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using BooksAPI.Models;
using System.Xml;
using System.IO;
using System.Xml.Serialization;
using System.Globalization;

namespace BooksAPI
{
    public class BookCatalog
    {
        private List<Book> catalog;
        public BookCatalog()
        {
            catalog = new List<Book>();
            DeserializeXMLFile();
        }
        private void AddBook(Book book)
        {
            catalog.Add(book);
        }
        public Book[] GetBooksByTitle(string title)
        {
            Book[] books = catalog.Where((p) => p.Title.Contains(title)).ToArray();

            return books;
        }
        public Book[] GetBooksByAuthor(string author)
        {
            Book[] books = catalog.Where((p) => p.Author.Contains(author)).ToArray();

            return books;
        }
        public Book[] GetAllBooks()
        {

            return catalog.ToArray();
        }
        /// <summary>
        /// Deserializes the Book.xml file to Book.cs objects
        /// and them adds the object to the catalog.
        /// </summary>
        private void DeserializeXMLFile()
        {
            XmlDocument doc = new XmlDocument();
            doc.Load(HttpContext.Current.Server.MapPath((@"~/App_Data/books.xml")));

            for (int i = 0; i < doc.LastChild.ChildNodes.Count; i++)
            {
                // Get a child from xml file
                var child = doc.LastChild.ChildNodes[i];

                // Create a book.cs object from child
                Book book = new Book
                {
                    Author = child.ChildNodes[0].InnerText,
                    Title = child.ChildNodes[1].InnerText,
                    Genre = child.ChildNodes[2].InnerText,
                    Price = float.Parse(child.ChildNodes[3].InnerText, CultureInfo.InvariantCulture),
                    Publish_Date = DateTime.Parse(child.ChildNodes[4].InnerText),
                    Description = child.ChildNodes[5].InnerText,
                    Id = i
                };

                catalog.Add(book);
            }
        }
    }
}