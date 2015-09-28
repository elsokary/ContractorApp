using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;


namespace DataModel.DTOModel
{

    public class DtoSubcontractorscustody
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

        public DateTime? custodyDate
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
    }

}

