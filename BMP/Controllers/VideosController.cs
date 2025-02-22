using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Microsoft.Web.Administration;
using System.Web.Hosting;

namespace BMP.Controllers
{
    public class VideosController : Controller
    {
        [HttpGet]
        public ActionResult DevicesTable()
        {
            zfy84Entities db = new zfy84Entities();
            List<Device> devices = db.Devices.ToList();

            return PartialView(devices);
        }
        
        [HttpGet]
        [Authorize]
        public ActionResult Devices()
        {
            zfy84Entities db = new zfy84Entities();
            List<Device> devices = db.Devices.ToList();

            return View(devices);
        }

        public ActionResult UploadSet()
        {
            return View();
        }

        public ActionResult FileUpload()
        {
            return View();
        }

        [HttpGet]
        public string GetDocComment(int docId)
        {
            zfy84Entities db = new zfy84Entities();
            return db.Docs.SingleOrDefault(d => d.id == docId).Comment;
        }

        private IEnumerable<Doc> SearchDocs(SearchFilters sf, zfy84Entities db)
        {
            //Run search, with filters
            IEnumerable<Doc> docs = db.Docs;
            if (sf.docType > -1) docs = docs.Where(d => d.DocType == sf.docType);
            if (sf.docGrade > -1) docs = docs.Where(d => d.GradeID == sf.docGrade);
            if (sf.dept > -1) docs = docs.Where(d => db.Staffs.Where(st => st.DepartmentID == sf.dept).Any(st => st.ID == d.StaffID));
            if (sf.note != null) docs = docs.Where(d => ((d.Comment == null) ? "" : d.Comment).Contains(sf.note));
            if (sf.policeNo != null) docs = docs.Where(d => d.PolNo == sf.policeNo);
            if (sf.deviceNo != null) docs = docs.Where(d => d.DevNo == sf.deviceNo);
            if (sf.docNo > -1) docs = docs.Where(d => d.id == sf.docNo);
            if (sf.dtFrom != null)
            {
                DateTime dtFrom2 = DateTime.Parse(sf.dtFrom);
                docs = docs.Where(d => d.PicDate > dtFrom2);
            }
            if (sf.dtTo != null)
            {
                DateTime dtTo2 = DateTime.Parse(sf.dtTo);
                docs = docs.Where(d => d.PicDate < dtTo2);
            }

            //Total recs
            ViewBag.TotalRecs = docs.Count();

            //Pagination
            docs = docs.Skip((sf.pageNo - 1) * sf.pageSize).Take(sf.pageSize);

            return docs;
        }

        [HttpGet]
        public ActionResult Search()
        {
            //Db
            zfy84Entities db = new zfy84Entities();
            
            //Get search filter lists
            ViewBag.DocTypes = db.DocTypes.ToList();
            ViewBag.DocGrades = db.DocGrades.ToList();
            ViewBag.Depts = db.StaffDepartments.ToList();

            //Total recs
            ViewBag.TotalRecs = 0;

            return View();
        }

        [HttpPost]
        public ActionResult Search(SearchFilters sf, string delDocs, DocUpdateModel dum)
        {
            //Db
            zfy84Entities db = new zfy84Entities();
            
            //Update doc
            if (dum.DocId > 0)
            {
                Doc docToEdit = db.Docs.SingleOrDefault(d => d.id == dum.DocId);
                docToEdit.GradeID = dum.DocGrade;
                docToEdit.Comment = dum.Comment;
                db.SaveChanges();
            }

            //Delete Docs
            if (delDocs.Length > 0)
            {
                string[] arrDocs = delDocs.Split(',');

                foreach (string docId in arrDocs)
                {
                    int docId2 = int.Parse(docId);
                    Doc docRemove = db.Docs.Single(d => d.id == docId2);
                    if(docRemove != null) db.Docs.Remove(docRemove);
                }
                db.SaveChanges();
            }

            //Run search
            IEnumerable<Doc> docs = SearchDocs(sf, db);
            
            //Get search filter lists
            ViewBag.DocTypes = db.DocTypes.ToList();
            ViewBag.DocGrades = db.DocGrades.ToList();
            ViewBag.Depts = db.StaffDepartments.ToList();

            return View(docs);
        }

        [HttpGet]
        public ActionResult SearchTable()
        {
            zfy84Entities db = new zfy84Entities();
            IEnumerable<Doc> searchResults = SearchDocs(new SearchFilters(), db);

            return PartialView(searchResults);
        }
        
        public ActionResult PreviewParams()
        {
            return View();
        }

        public class DocUpdateModel
        {
            public int DocId { get; set; }
            public int DocGrade { get; set; }
            public string Comment { get; set; }
        }

        public class SearchFilters
        {
            public SearchFilters()
            {
                docType = -1;
                docGrade = -1;
                dept = -1;
                docNo = -1;
            }
            public int docType { get; set; }
            public int docGrade { get; set; }
            public int dept { get; set; }
            public string note { get; set; }
            public string policeNo { get; set; }
            public string deviceNo { get; set; }
            public int docNo { get; set; }
            public string dtFrom { get; set; }
            public string dtTo { get; set; }
            public int pageSize { get; set; }
            public int pageNo { get; set; }
        }
    }
}
