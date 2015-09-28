using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;


namespace DataModel.DTOModel
{

    public class DtoProjectssubcontractors
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
        public string address
        {
            get;
            set;
        }
        public string phone
        {
            get;
            set;
        }
        public string fax
        {
            get;
            set;
        }
        public string email
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
    }

}

