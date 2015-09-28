﻿using DataContext.DBModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Interface.IDataService
{
    public interface ICompaniesRepository : IGenericRepository<companies>
    {
    }
}