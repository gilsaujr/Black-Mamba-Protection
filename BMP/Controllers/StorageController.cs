using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using BMP.Models;

namespace BMP.Controllers
{
    public class StorageController : Controller
    {
        [HttpGet]
        public ActionResult CloudSpace()
        {
            zfy84Entities db = new zfy84Entities();
            return View(GetCloudSpace(db));
        }

        [HttpPost]
        public ActionResult CloudSpace(AddCloudModel acm, string delClouds = "", int cloudId = 0)
        {
            zfy84Entities db = new zfy84Entities();

            //Delete Depts
            if (delClouds.Length > 0)
            {
                string[] arrClouds = delClouds.Split(',');

                foreach (string wId in arrClouds)
                {
                    int cloudId2 = int.Parse(wId);
                    SaveCloudSpace cloudRemove = db.SaveCloudSpaces.Single(w => w.Id == cloudId2);
                    if (cloudRemove != null) db.SaveCloudSpaces.Remove(cloudRemove);
                }
                db.SaveChanges();
            }

            //Add serverstation
            if (acm.Name != null && cloudId == 0)
            {
                SaveCloudSpace cloudNew = new SaveCloudSpace();
                cloudNew.ServiceName = acm.Name;
                cloudNew.EndPoint = acm.Endpoint;
                cloudNew.APIKey = acm.APIKey;
                cloudNew.Username = acm.Username;
                cloudNew.Password = acm.Password;


                db.SaveCloudSpaces.Add(cloudNew);
                db.SaveChanges();
            }

            //Update serverstation
            if (cloudId > 0)
            {
                SaveCloudSpace cloudToEdit = db.SaveCloudSpaces.FirstOrDefault(sd => sd.Id == cloudId);
                if (cloudToEdit != null)
                {
                    cloudToEdit.ServiceName = acm.Name;
                    cloudToEdit.EndPoint = acm.Endpoint;
                    cloudToEdit.APIKey = acm.APIKey;
                    cloudToEdit.Username = acm.Username;
                    cloudToEdit.Password = acm.Password;
                    db.SaveChanges();
                }
            }

            return View(GetCloudSpace(db));
        }

        private IEnumerable<object> GetCloudSpace(zfy84Entities db)
        {
            return db.SaveCloudSpaces.Select(s => new CloudInViewModel { Id = s.Id, ServiceName = s.ServiceName, EndPoint = s.EndPoint, APIKey = s.APIKey, Username = s.Username, Password = s.Password });
        }

        public class AddCloudModel
        {
            public string Name { get; set; }
            public string Endpoint { get; set; }
            public string APIKey { get; set; }
            public string Username { get; set; }
            public string Password { get; set; }
        }

        [HttpGet]
        public ActionResult Servers()
        {
            zfy84Entities db = new zfy84Entities();
            return View(GetServer(db));
        }

        [HttpPost]
        public ActionResult Servers(AddServerModel awm, string delServers = "", int serverId = 0)
        {
            zfy84Entities db = new zfy84Entities();

            //Delete Depts
            if (delServers.Length > 0)
            {
                string[] arrServers = delServers.Split(',');

                foreach (string wId in arrServers)
                {
                    int serverId2 = int.Parse(wId);
                    Server serverRemove = db.Servers.Single(w => w.Id == serverId2);
                    if (serverRemove != null) db.Servers.Remove(serverRemove);
                }
                db.SaveChanges();
            }

            //Add serverstation
            if (awm.ServerName != null && serverId == 0)
            {
                Server serverNew = new Server();
                serverNew.Name = awm.ServerName;
                serverNew.IPaddress = awm.IPaddress;
                serverNew.StorePath = awm.SaveFilePath;
                serverNew.SaveDays = awm.SaveDays;

                db.Servers.Add(serverNew);
                db.SaveChanges();
            }

            //Update serverstation
            if (serverId > 0)
            {
                Server serverToEdit = db.Servers.FirstOrDefault(sd => sd.Id == serverId);
                if (serverToEdit != null)
                {
                    serverToEdit.Name = awm.ServerName;
                    serverToEdit.IPaddress = awm.IPaddress;
                    serverToEdit.StorePath = awm.SaveFilePath;
                    serverToEdit.SaveDays = awm.SaveDays;
                    db.SaveChanges();
                }
            }

            return View(GetServer(db));
        }

        private IEnumerable<object> GetServer(zfy84Entities db)
        {
            return db.Servers.Select(s => new ServerInViewModel { Id = s.Id, ServerName = s.Name, IPaddress = s.IPaddress, SaveFilePath = s.StorePath, SaveDays = s.SaveDays });
        }

        public class AddServerModel
        {
            public string ServerName { get; set; }
            public string IPaddress { get; set; }
            public string SaveFilePath { get; set; }
            public int SaveDays { get; set; }
        }
    }
}
