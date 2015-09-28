using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;


namespace DataModel.DTOModel
{

    public class DtoWorkertimesheet
    {
        public int id
        {
            get;
            set;
        }

        public int? workerId
        {
            get;
            set;
        }
        public int? workerTypeId
        {
            get;
            set;
        }

        public string workerName
        {
            get;
            set;
        }

        public string dayName { get; set; }
        public DateTime? workDate
        {
            get;
            set;
        }

        public double? quantity
        {
            get;
            set;
        }

        public double? unitPrice
        {
            get;
            set;
        }

        public double? total
        {
            get;
            set;
        }
        public double? credit
        {
            get;
            set;
        }
        public double? totalDays
        {
            get;
            set;
        }
        public double? remaining
        {
            get;
            set;
        }
        public int? projectId
        {
            get;
            set;
        }

        public string projectName
        {
            get;
            set;
        }

        public string notes
        {
            get;
            set;
        }
        public double? loans
        {
            get;
            set;
        }
    }

}

