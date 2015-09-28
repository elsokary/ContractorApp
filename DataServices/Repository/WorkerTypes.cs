﻿using DataContext.DBModel;
using Interface.IDataService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataServices.Repository
{
    public class WorkerTypes : GenericRepository<SharktyContext, workerTypes>, IWorkerTypes
    {
    }
}