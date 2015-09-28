using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;


namespace DataModel.DTOModel
{

    public class DtoCheques
    {
        public int id
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

        public double? chequeTotal
        {
            get;
            set;
        }

        public double? taxes
        {
            get;
            set;
        }

        public double? total
        {
            get;
            set;
        }

        public string chequeNumber
        {
            get;
            set;
        }

        public string bankName
        {
            get;
            set;
        }

        public string branch
        {
            get;
            set;
        }

        public DateTime? chequeDate
        {
            get;
            set;
        }

        public string notes
        {
            get;
            set;
        }

        public bool? status
        {
            get;
            set;
        }

        public int? companyId
        {
            get;
            set;
        }

        public string companyName
        {
            get;
            set;
        }
    }

}

