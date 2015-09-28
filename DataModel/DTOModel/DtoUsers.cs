using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;


namespace DataModel.DTOModel
{

    public class DtoUsers
    {
        public int id
        {
            get;
            set;
        }

        public string userName
        {
            get;
            set;
        }

        public string userPassword
        {
            get;
            set;
        }
        public string deletePassword
        {
            get;
            set;
        }
        public string editPassword
        {
            get;
            set;
        }

        public string fullName
        {
            get;
            set;
        }
    }

}

