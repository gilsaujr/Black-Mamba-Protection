using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BMP.Models
{
    public class ServerInViewModel
    {
        public int Id { get; set; }
        public string ServerName { get; set; }
        public string IPaddress { get; set; }
        public string SaveFilePath { get; set; }
        public int? SaveDays { get; set; }
        public string SpaceAvail { get; set; }
        public string SpaceUsed { get; set; }
    }
}