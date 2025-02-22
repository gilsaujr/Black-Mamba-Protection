using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using BMP.Models;

namespace BMP.Controllers
{
    public class OfficeController : Controller
    {
        [HttpGet]
        public ActionResult Depts()
        {
            zfy84Entities db = new zfy84Entities();
            return View(GetDepts(db));
        }

        [HttpPost]
        public ActionResult Depts(AddDeptModel adm, string delDepts="", int deptId=0)
        {
            zfy84Entities db = new zfy84Entities();

            //Delete Depts
            if (delDepts.Length > 0)
            {
                string[] arrDepts = delDepts.Split(',');

                foreach (string dId in arrDepts)
                {
                    int deptId2 = int.Parse(dId);
                    StaffDepartment deptRemove = db.StaffDepartments.Single(d => d.id == deptId2);
                    if (deptRemove != null) db.StaffDepartments.Remove(deptRemove);
                }
                db.SaveChanges();
            }

            //Add department
            if (adm.DeptName != null && deptId == 0)
            {
                StaffDepartment deptNew = new StaffDepartment();
                deptNew.DepartName = adm.DeptName;
                if (adm.ParentDeptId > 0) deptNew.ParentID = adm.ParentDeptId;
                
                db.StaffDepartments.Add(deptNew);
                db.SaveChanges();
            }

            //Update department
            if (deptId > 0)
            {
                StaffDepartment deptToEdit = db.StaffDepartments.FirstOrDefault(sd => sd.id == deptId);
                if (deptToEdit != null)
                {
                    deptToEdit.DepartName = adm.DeptName;
                    if(adm.ParentDeptId > 0) deptToEdit.ParentID = adm.ParentDeptId;
                    db.SaveChanges();
                }
            }

            return View(GetDepts(db));
        }

        private IEnumerable<object> GetDepts(zfy84Entities db)
        {
            return db.StaffDepartments.Select(sd => new DeptInViewModel { Id = sd.id, Name = sd.DepartName, ParentId = sd.ParentID, ParentName = (sd.ParentID != null ? db.StaffDepartments.FirstOrDefault(sd2 => sd2.id == sd.ParentID).DepartName : "") });
        }

        public class AddDeptModel
        {
            public int ParentDeptId { get; set; }
            public string DeptName { get; set; }
        }

        [HttpGet]
        public ActionResult Workstations()
        {
            zfy84Entities db = new zfy84Entities();
            return View(GetWorkstations(db));
        }

        [HttpPost]
        public ActionResult Workstations(AddWorkModel awm, string delWorks = "", int workId = 0)
        {
            zfy84Entities db = new zfy84Entities();

            //Delete Depts
            if (delWorks.Length > 0)
            {
                string[] arrWorks = delWorks.Split(',');

                foreach (string wId in arrWorks)
                {
                    int workId2 = int.Parse(wId);
                    WorkStation workRemove = db.WorkStations.Single(w => w.id == workId2);
                    if (workRemove != null) db.WorkStations.Remove(workRemove);
                }
                db.SaveChanges();
            }

            //Add workstation
            if (awm.WorkstationName != null && workId == 0)
            {
                WorkStation workNew = new WorkStation();
                workNew.WorkStationname = awm.WorkstationName;
                workNew.WorkStationIP = awm.IPaddress;
                workNew.StorePath = awm.SaveFilePath;
                workNew.SaveDays = awm.SaveDays;

                db.WorkStations.Add(workNew);
                db.SaveChanges();
            }

            //Update workstation
            if (workId > 0)
            {
                WorkStation workToEdit = db.WorkStations.FirstOrDefault(sd => sd.id == workId);
                if (workToEdit != null)
                {
                    workToEdit.WorkStationname = awm.WorkstationName;
                    workToEdit.WorkStationIP = awm.IPaddress;
                    workToEdit.StorePath = awm.SaveFilePath;
                    workToEdit.SaveDays = awm.SaveDays;
                    db.SaveChanges();
                }
            }

            return View(GetWorkstations(db));
        }

        private IEnumerable<object> GetWorkstations(zfy84Entities db)
        {
            return db.WorkStations.Select(w => new WorkInViewModel { Id = w.id, WorkstationName = w.WorkStationname, IPaddress = w.WorkStationIP, SaveFilePath = w.StorePath, SaveDays = w.SaveDays });
        }

        public class AddWorkModel
        {
            public string WorkstationName { get; set; }
            public string IPaddress { get; set; }
            public string SaveFilePath { get; set; }
            public int SaveDays { get; set; }
        }
    }
}
