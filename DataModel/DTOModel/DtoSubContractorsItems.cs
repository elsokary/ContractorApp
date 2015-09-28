using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;


namespace DataModel.DTOModel
{

    public class DtoSubcontractorsitems
    {
        public int id
        {
            get;
            set;
        }

        public int? contractorId
        {
            get;
            set;
        }

        public string contractorName
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

        public string description
        {
            get;
            set;
        }

        public string unit
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

        public string notes
        {
            get;
            set;
        }
        public DateTime? item_date
        {
            get;
            set;
        }
    }

}

