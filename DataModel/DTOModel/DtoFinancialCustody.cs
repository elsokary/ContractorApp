using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;


namespace DataModel.DTOModel
{

    public class DtoFinancialcustody
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

        public int? accounterId
        {
            get;
            set;
        }

        public string accounterName
        {
            get;
            set;
        }

        public double? total
        {
            get;
            set;
        }

        public DateTime? custodyDate
        {
            get;
            set;
        }

        public string notes
        {
            get;
            set;
        }
    }

}

