using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebMatrix.Data;
using WebMatrix.WebData;

namespace BMP.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            if (!WebSecurity.IsAuthenticated)
                return RedirectToAction("Login", "Account");
            else
                return View();
        }
    }
}
