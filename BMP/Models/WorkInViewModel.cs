using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BMP.Models
{
    public class WorkInViewModel
    {
        public int Id { get; set; }
        public string WorkstationName { get; set; }
        public string IPaddress { get; set; }
        public string SaveFilePath { get; set; }
        public int? SaveDays { get; set; }
    }
}