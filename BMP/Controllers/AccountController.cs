using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Data.SqlClient;
using System.Configuration;
using System.Security;
using WebMatrix.Data;
using WebMatrix.WebData;
using BMP.Filters;

namespace BMP.Controllers
{
    [InitializeSimpleMembership]
    public class AccountController : Controller
    {
        [HttpGet]
        public ActionResult Login(int logout=0, string returnUrl="")
        {
            if (logout == 1)
                WebSecurity.Logout();

            return View();
        }
        
        [HttpPost]
        public ActionResult Login(string txt_username_login, string txt_password_login, string returnUrl="")
        {
            if (WebSecurity.Login(txt_username_login, txt_password_login))
            {
                return RedirectToLocal(returnUrl);
            }
            else
            {
                TempData["ErrMsg"] = "Sorry, username/password combination is incorrect.";
            }

            return View();
        }

        #region Helpers
        private ActionResult RedirectToLocal(string returnUrl)
        {
            if (Url.IsLocalUrl(returnUrl) && !string.IsNullOrEmpty(returnUrl))
            {
                return Redirect(returnUrl);
            }
            else
            {
                return RedirectToAction("Index", "Home");
            }
        }
        #endregion

    }
}
