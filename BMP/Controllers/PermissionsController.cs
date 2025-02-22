using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace BMP.Controllers
{
    public class PermissionsController : Controller
    {
        public ActionResult Rights()
        {
            return View();
        }

        public ActionResult Users()
        {
            return View();
        }

        public ActionResult Pwd()
        {
            return View();
        }
    }
}
