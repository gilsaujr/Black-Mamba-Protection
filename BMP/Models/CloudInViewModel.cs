using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BMP.Models
{
    public class CloudInViewModel
    {
        public int Id { get; set; }
        public string ServiceName { get; set; }
        public string EndPoint { get; set; }
        public string APIKey { get; set; }
        public string SpaceAvail { get; set; }
        public string SpaceUsed { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
    }
}