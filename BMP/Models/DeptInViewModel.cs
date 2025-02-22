using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BMP.Models
{
    public class DeptInViewModel
    {
        public int Id { get; set; }
        public int? ParentId { get; set; }
        public string Name { get; set; }
        public string ParentName { get; set; }
    }
}