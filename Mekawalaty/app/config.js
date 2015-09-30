define(['text!resources.json', 'text!permissions.json', 'services/tokenstore', 'services/export'], function (resources, permissions, tokenStore, exportService) {
    var routes = [{
        route: '',
        moduleId: 'login',
        title: 'Login',
        nav: true,
        settings: { Login: true }
    }, {
        route: 'Dashboard',
        moduleId: 'dashboard',
        title: 'Dashboard',
        nav: true,
        settings: { Dashboard: true }
    }, {
        route: 'workspace',
        moduleId: 'workspace/workspace',
        title: 'Workspace',
        nav: true,
        settings: { Workspace: true }
    }, {
        route: 'reportsMenu',
        moduleId: 'reportsMenu',
        title: 'Reports Menu',
        nav: true,
        settings: { ReportsMenuTop: true }
    }, {
        route: 'quantitiesAlerting',
        moduleId: 'accounts/quantitiesAlerting',
        title: 'quantitiesAlerting',
        nav: true,
        settings: { Projects: true }
    }, {
        route: 'accountConfiguration',
        moduleId: 'accounts/configration',
        title: 'Configuration',
        nav: true,
        settings: { accounts: true }
    }, {
        route: 'salaryCategories',
        moduleId: 'accounts/salaryCategories',
        title: 'salaryCategories',
        nav: true,
        settings: { Configuration: true }
    }, {
        route: 'CollectedInvoices',
        moduleId: 'reports/collectedInvoices',
        title: 'collectedInvoices',
        nav: true,
        settings: { Reports: true, permission: '686' }
    }, {
        route: 'accounts',
        moduleId: 'accounts/accounts',
        title: 'accounts',
        nav: true,
        settings: { User: true }
    }, {
        route: 'materialInventoryLog',
        moduleId: 'accounts/materialInventoryLog',
        title: 'materialInventory',
        nav: true,
        hash: '#materialInventoryLog',
        settings: { GeneralConfig: true }
    }, {
        route: 'accountsEdit/:param1*detail',
        moduleId: 'accounts/accountsEdit',
        title: 'accountsEdit',
        nav: false
    }, {
        route: 'userEps/:accountId',
        moduleId: 'projects/userEps',
        title: 'User Eps',
        nav: false
    }, {
        route: 'eps',
        moduleId: 'projects/eps',
        title: 'EPS',
        nav: true,
        settings: { EPS: true }
    }, {
        route: 'projectsEdit/:param1',
        moduleId: 'projects/projectsEdit',
        title: 'Project Edit',
        nav: false
    }, {
        route: 'projectsAdd/:param1',
        moduleId: 'projects/projectsAdd',
        title: 'Project Add',
        nav: false
    }, {
        route: 'userCompany/:param1*detail',
        moduleId: 'projects/userCompany',
        title: 'User Company',
        nav: false
    }, {
        route: 'projects/:param1*detail',
        moduleId: 'projects/projects',
        title: 'Projects',
        nav: false
    }, {
        route: 'accountsDefaultList',
        moduleId: 'accounts/accountsDefaultList',
        title: 'AccountsDefaultList',
        nav: true,
        settings: { Accounts: true }
    }, {
        route: 'permissionsGroups',
        moduleId: 'accounts/permissionsGroups',
        title: 'accountPermissionsGroups',
        nav: true,
        settings: { User: true }
    }, {
        route: 'permissionsGroupsPermissions/:param1*detail',
        moduleId: 'accounts/permissionsGroupsPermissions',
        title: 'Permission Groups Permissions',
        nav: false,
        settings: { Configuration: false }
    }, {
        route: 'accountsGroup/:groupId*detail',
        moduleId: 'accounts/accountsGroup',
        title: 'accountsGroup',
        nav: false
    }, {
        route: 'accountsGroupEdit/:groupId*detail',
        moduleId: 'accounts/accountsGroupEdit',
        title: 'Accounts Group Edit',
        nav: false
    }, {
        route: 'accountsAdd',
        moduleId: 'accounts/accountsAdd',
        title: 'Add Account',
        nav: false
    }, {
        route: 'permissionsGroupsPermissions',
        moduleId: 'accounts/permissionsGroupsPermissions',
        title: 'Permissions Groups Permissions',
        nav: false
    }, {
        route: 'projectCompanies',
        moduleId: 'projects/projectCompanies',
        title: 'Companies',
        nav: true,
        settings: { User: true }
    }, {
        route: 'projectCompaniesAddEdit/:param',
        moduleId: 'projects/projectCompaniesAddEdit',
        title: 'Companies',
        nav: true,
        settings: { User: true }
    }, {
        route: 'projectCompanyContacts/:param1*detail',
        moduleId: 'projects/projectCompanyContacts',
        title: 'ContactsLog',
        nav: false,
        settings: { Configuration: true }
    }, {
        route: 'Postit',
        moduleId: 'accounts/postit',
        title: 'Postit',
        nav: true,
        settings: { UserProfile: true }
    }, {
        route: 'configration',
        moduleId: 'accounts/configration',
        title: 'GeneralConfig',
        nav: true,
        settings: { Configuration: true }
    }, {
        route: 'supplierAnalysisSections',
        moduleId: 'accounts/supplierAnalysisSections',
        title: 'SupplierAnalysisSection',
        nav: true,
        settings: { Accounts: true }
    }, {
        route: 'supplierAnalysisSectionsItems',
        moduleId: 'accounts/supplierAnalysisSectionsItems',
        title: 'Supplier Analysis Sections Item',
        nav: true,
        settings: { Accounts: false }
    }, {
        route: 'accountsProjects/:param1*detail',
        moduleId: 'accounts/accountsProjects',
        title: 'accounts Projects',
        nav: true
    }, {
        route: 'userProjects/:id',
        moduleId: 'projects/userProjects',
        title: 'accounts Projects',
        nav: true
    }, {
        route: 'timesheet',
        moduleId: 'logs/timesheet',
        title: 'timeSheet',
        nav: true,
        settings: { UserProfile: true }
    }, {
        route: 'accountsContractsConditionsCategory',
        moduleId: 'accounts/accountsContractsConditionsCategory',
        title: 'contract',
        nav: true,
        settings: { Accounts: true }
    }, {
        route: 'accountsContractsGeneralConditions',
        moduleId: 'accounts/accountsContractsGeneralConditions',
        title: 'General Conditions ',
        nav: true,
        settings: { Accounts: false }
    }, {
        route: 'accountsContractsParticularConditions',
        moduleId: 'accounts/accountsContractsParticularConditions',
        title: 'Particular Conditions',
        nav: true,
        settings: { Accounts: false }
    }, {
        route: 'designDiscipline',
        moduleId: 'accounts/designDiscipline',
        title: 'designDiscipline',
        nav: true,
        settings: { Accounts: true }
    }, {
        route: 'DesignDisciplineSections',
        moduleId: 'accounts/designDisciplineSections',
        title: 'Design Discipline Sections',
        nav: true,
        settings: { Accounts: false }
    }, {
        route: 'tenderAnalysisSections',
        moduleId: 'accounts/tenderAnalysisSections',
        title: 'tenderAnalysySection',
        nav: true,
        settings: { Accounts: true }
    }, {
        route: 'tenderAnalysisSectionsItems',
        moduleId: 'accounts/tenderAnalysisSectionsItems',
        title: 'Tender Analysis Sections Items',
        nav: true,
        settings: { Accounts: false }
    }, {
        route: 'login',
        moduleId: 'login',
        title: 'Login',
        nav: true
    }, {
        route: 'expensesUser',
        moduleId: 'logs/expensesUser',
        hash: '#expensesUser',
        title: 'expenses',
        nav: true,
        settings: { Expenses: true }
    }, {
        route: 'myExpensesUser',
        moduleId: 'logs/myExpensesUser',
        hash: '#expensesUser',
        title: 'My Expenses',
        nav: true,
        settings: { Expenses: false }
    }, {
        route: 'Rfi/:isWidget',
        moduleId: 'commonLog',
        title: 'communicationRFI',
        nav: true,
        hash: '#Rfi',
        settings: { Communication: true, permission: 79, caption: 'procoor-icon-RFIs' }
    }, {
        route: 'rfiAddEdit/:param1',
        moduleId: 'communication/rfiAddEdit',
        title: 'Request for Information',
        nav: false,
        settings: { Communication: false }
    }, {
        route: 'rfiView/:id*detail',
        moduleId: 'communication/rfiView',
        title: 'rfi',
        nav: false,
        settings: { Communication: false }
    }, {
        route: 'Letters/:isWidget',
        moduleId: 'commonLog',
        title: 'lettertitle',
        nav: true,
        hash: '#Letters',
        settings: { Communication: true, permission: 52, caption: 'procoor-icon-letters' }
    }, {
        route: 'imapEmails/:isWidget',
        moduleId: 'projects/imapEmails',
        title: 'email',
        nav: true,
        hash: '#imapEmails'
    }, {
        route: 'lettersAddEdit/:param1*detail',
        moduleId: 'communication/lettersAddEdit',
        title: 'Letters Add',
        nav: false,
        settings: { Communication: false }
    }, {
        route: 'Phone/:isWidget',
        moduleId: 'commonLog',
        title: 'phoneTitle',
        nav: true,
        hash: '#Phone',
        settings: { Communication: true, permission: 93, caption: 'procoor-icon-telephone-records' }
    }, {
        route: 'phoneAddEdit/:param1*detail',
        moduleId: 'communication/phoneAddEdit',
        title: 'Phone Add',
        nav: false,
        settings: { Communication: false }
    }, {
        route: 'requestProposalAddEdit/:id*detail',
        moduleId: 'communication/requestProposalAddEdit',
        title: 'Proposal Edit',
        nav: false,
        settings: { Communication: false }
    }, {
        route: 'RequestProposal/:isWidget',
        moduleId: 'commonLog',
        title: 'requestProposal',
        nav: true,
        hash: '#RequestProposal',
        settings: { Communication: true, permission: 61, caption: 'procoor-icon-proposal-request' }
    }, {
        route: 'Proposal/:isWidget',
        moduleId: 'commonLog',
        title: 'proposal',
        nav: true,
        hash: '#Proposal',
        settings: { Communication: true, permission: 70, caption: 'procoor-icon-proposal' }
    }, {
        route: 'proposalAddEdit/:id*detail',
        moduleId: 'communication/proposalAddEdit',
        title: 'Proposal Add',
        nav: false,
        settings: { Communication: false }
    }, {
        route: 'communicationProposalView/:id*detail',
        moduleId: 'communication/proposalView',
        title: 'Proposal View',
        nav: false,
        settings: { Communication: false }
    }, {
        route: 'proposalAddEdit/:id*detail',
        moduleId: 'communication/proposalAddEdit',
        title: 'Proposal Edit',
        nav: false,
        settings: { Communication: false }
    }, {
        route: 'Reports/:isWidget',
        moduleId: 'commonLog',
        title: 'Reports',
        nav: true,
        hash: '#Reports',
        settings: { Communication: true, permission: 427, caption: 'procoor-icon-reports' }
    }, {
        route: 'reportsAddEdit/:id*detail',
        moduleId: 'communication/reportsAddEdit',
        title: 'Report Add',
        nav: false,
        settings: { Communication: false }
    }, {
        route: 'reportsAddEdit/:id*detail',
        moduleId: 'communication/reportsAddEdit',
        title: 'Report Edit',
        nav: false,
        settings: { Communication: false }
    }, {
        route: 'InternalMemo/:isWidget',
        moduleId: 'commonLog',
        title: 'communicationInternalMemo',
        nav: true,
        hash: '#InternalMemo',
        settings: { Communication: true, permission: 102, caption: 'procoor-icon-internal-memo' }
    }, {
        route: 'internalMemoAddEdit/:id',
        moduleId: 'communication/internalMemoAddEdit',
        title: 'Internal Memo',
        nav: false,
        settings: { Communication: false }
    }, {
        route: 'communicationInternalMemoView/:id',
        moduleId: 'communication/internalMemoView',
        title: 'Internal Memo',
        nav: false,
        settings: { Communication: false }
    }, {
        route: 'communicationEmailView/:id',
        moduleId: 'communication/emailView',
        title: 'Email Records',
        nav: false,
        settings: { Communication: false }
    }, {
        route: 'emailAddEdit/:id',
        moduleId: 'communication/emailAddEdit',
        title: 'Email Records',
        nav: false,
        settings: { Communication: false }
    }, {
        route: 'Email/:isWidget',
        moduleId: 'commonLog',
        title: 'communicationEmails',
        nav: true,
        hash: '#Email',
        settings: { Communication: true, permission: 395, caption: 'procoor-icon-email-records' }
    }, {
        route: 'CorrespondenceSent/:isWidget',
        moduleId: 'commonLog',
        title: 'correspondenceSentLog',
        nav: true,
        hash: '#CorrespondenceSent',
        settings: { Communication: true, permission: 42, caption: 'procoor-icon-correspondence-sent' }
    }, {
        route: 'correspondenceSentAddEdit/:id',
        moduleId: 'communication/correspondenceSentAddEdit',
        title: 'Correspondence Sent',
        nav: false,
        settings: { Communication: false }
    }, {
        route: 'communicationCorrespondenceSentView/:id',
        moduleId: 'communication/correspondenceSentView',
        title: 'Correspondence Sent',
        nav: false,
        settings: { Communication: false }
    }, {
        route: 'CorrespondenceReceived/:isWidget',
        moduleId: 'commonLog',
        title: 'communicationCorrespondenceReceived',
        nav: true,
        hash: '#CorrespondenceReceived',
        settings: { Communication: true, permission: 47, caption: 'procoor-icon-correspondence-received' }
    }, {
        route: 'correspondenceReceivedAddEdit/:id',
        moduleId: 'communication/correspondenceReceivedAddEdit',
        title: 'Correspondence Received Addition',
        nav: false,
        settings: { Communication: false }
    }, {
        route: 'projectTaskGroupAddEdit/:id',
        moduleId: 'projects/projectTaskGroupAddEdit',
        title: 'project Task Group ',
        nav: false,
        settings: { Communication: false }
    }, {
        route: 'sendByInbox/:id',
        moduleId: 'panels/sendByInbox',
        title: 'Send By Inbox ',
        nav: true
    }, {
        route: 'sendTask/:id',
        moduleId: 'panels/sendTask',
        title: 'Send Task ',
        nav: true
    }, {
        route: 'documentApproval',
        moduleId: 'panels/documentApproval',
        title: 'Document Approval',
        nav: true
    }, {
        route: 'sendByEmail/:id',
        moduleId: 'panels/sendByEmail',
        title: 'Send By Email ',
        nav: true
    }, {
        route: 'projectPictures',
        moduleId: 'projects/projectPictures',
        title: 'projectPictures',
        nav: true,
        settings: { General: true, permission: 554, caption: 'procoor-icon-pictures' }
    }, {
        route: 'projectPicturesAddEdit/:id',
        moduleId: 'projects/projectPicturesAddEdit',
        title: 'projectPictures',
        nav: false,
        settings: { General: false }
    }, {
        route: 'projectProjectsCompanies',
        moduleId: 'projects/projectProjectsCompanies',
        title: 'Companies',
        nav: true,
        settings: { General: true, permission: 4, caption: 'procoor-icon-companies' }
    }, {
        route: 'projectWorkFlow',
        moduleId: 'projects/projectWorkFlow',
        title: 'workFlow',
        nav: true,
        settings: { General: true, permission: 604, caption: 'procoor-icon-workflow' }
    }, {
        route: 'projectTaskGroups',
        moduleId: 'projects/projectTaskGroups',
        title: 'projectTaskGroups',
        nav: true,
        settings: { General: true, permission: 778, caption: 'procoor-icon-task-groups' }
    }, {
        route: 'projectOrganizationChart',
        moduleId: 'projects/projectOrganizationChart',
        title: 'organizationChart',
        nav: true,
        settings: { General: true, permission: 464, caption: 'procoor-icon-organization-chart' }
    }, {
        route: 'projectDistributionList',
        moduleId: 'projects/projectDistributionList',
        title: 'distributionList',
        nav: true,
        settings: { General: true, permission: 629, caption: 'procoor-icon-distribution-list' }
    }, {
        route: 'projectProjectHeaderFooter',
        moduleId: 'projects/projectProjectHeaderFooter',
        title: 'headerAndFooter',
        nav: true,
        settings: { General: true, permission: 484, caption: 'procoor-icon-project-page-setup' }
    }, {
        route: 'projectDistributionListAddEdit/:id',
        moduleId: 'projects/projectDistributionListAddEdit',
        title: 'Project Distribution List Addition',
        nav: false,
        settings: { General: false }
    }, {
        route: 'projectCheckListAddEdit/:id',
        moduleId: 'projects/projectCheckListAddEdit',
        title: 'Project Check List Addition',
        nav: false,
        settings: { General: false }
    }, {
        route: 'projectsForm',
        moduleId: 'projects/projectsForm',
        title: 'projectsForms',
        nav: true,
        settings: { General: true, permission: 907, caption: 'procoor-icon-general-forms' }
    }, {
        route: 'accountsAlerts',
        moduleId: 'accounts/accountsAlerts',
        title: 'alerts',
        nav: true,
        settings: { General: true, permission: 108, caption: 'procoor-icon-alerts' }
    }, {
        route: 'accountsBic',
        moduleId: 'accounts/accountsBic',
        title: 'bicAlerts',
        nav: true,
        settings: { General: true, permission: 109, caption: 'procoor-icon-BIC' }
    }, {
        route: 'CommunicationMeetingAgenda/:isWidget',
        moduleId: 'commonLog',
        title: 'meetingAgendaLog',
        nav: true,
        hash: '#CommunicationMeetingAgenda',
        settings: { Communication: true, permission: 456, caption: 'procoor-icon-meeting-agenda' }
    }, {
        route: 'meetingAgendaAddEdit/:id',
        moduleId: 'communication/meetingAgendaAddEdit',
        title: 'Meeting Agenda Addition',
        nav: false,
        settings: { Communication: false }
    }, {
        route: 'projectWorkFlowAddEdit/:id',
        moduleId: 'projects/projectWorkFlowAddEdit',
        title: 'project Work Flow Add',
        nav: false,
        settings: { General: false }
    }, {
        route: 'InternalMeetingMinutes/:isWidget',
        moduleId: 'commonLog',
        hash: '#InternalMeetingMinutes',
        title: 'internalMeetingMinutes',
        nav: true,
        settings: { Communication: true, permission: 508, caption: 'procoor-icon-internal-meeting-minutes' }
    }, {
        route: 'CommunicationMeetingMinutesExternal/:isWidget',
        moduleId: 'commonLog',
        hash: '#CommunicationMeetingMinutesExternal',
        title: 'externalMeetingMinutes',
        nav: true,
        settings: { Communication: true, permission: 111, caption: 'procoor-icon-external-meeting-minutes' }
    }, {
        route: 'meetingMinutesAddEdit/:Id',
        moduleId: 'communication/meetingMinutesAddEdit',
        title: 'communication Meeting Minutes Addition',
        nav: false,
        settings: { Communication: false }
    }, {
        route: 'Transmittal/:isWidget',
        moduleId: 'commonLog',
        title: 'transmittal',
        nav: true,
        hash: '#Transmittal',
        settings: { Communication: true, permission: 88, caption: 'procoor-icon-transmittals' }
    }, {
        route: 'transmittalAddEdit/:Id',
        moduleId: 'communication/transmittalAddEdit',
        title: 'Transmittal Addition',
        nav: false,
        settings: { Communication: false }
    }, {
        route: 'projectSchedule',
        moduleId: 'commonLog',
        title: 'schedule',
        nav: true,
        hash: '#projectSchedule',
        settings: { Time: true, permission: 33, caption: 'procoor-icon-schedule' }
    }, {
        route: 'projectScheduleAddEdit/:id',
        moduleId: 'projects/projectScheduleAddEdit',
        title: 'Project Schedule Add',
        nav: false,
        settings: { Time: false }
    }, {
        route: 'projectPrimaveraSchedule',
        moduleId: 'commonLog',
        title: 'primaveraSchedule',
        nav: true,
        hash: '#projectPrimaveraSchedule',
        settings: { Time: true, permission: 586, caption: 'procoor-icon-primavera' }
    }, {
        route: 'projectPrimaveraScheduleAddEdit/:id',
        moduleId: 'projects/projectPrimaveraScheduleAddEdit',
        title: 'Pimavera Schedule Activities Addition',
        nav: false,
        settings: { Time: false }
    }, {
        route: 'projectTask',
        moduleId: 'projects/projectTask',
        title: 'projectTask',
        nav: true,
        settings: { Time: true, permission: 361, caption: 'procoor-icon-task' }
    }, {
        route: 'projectTaskAddEdit/:id',
        moduleId: 'projects/projectTaskAddEdit',
        title: 'projectTaskAddEdit',
        nav: false,
        settings: { Time: false }
    }, {
        route: 'copyTo/:id',
        moduleId: 'panels/copyTo',
        title: 'copyTo',
        nav: true,
        settings: { Time: false }
    }, {
        route: 'sendToWorkFlow/:id',
        moduleId: 'panels/sendToWorkFlow',
        title: 'Send To Work Flow',
        nav: true,
        settings: { General: false }
    }, {
        route: 'taskGroupPanel',
        moduleId: 'panels/taskGroupPanel',
        title: 'Send To Task Group',
        nav: false
    }, {
        route: 'communicationTransmittalPanel',
        moduleId: 'communication/TransmittalPanel',
        title: 'Send To Transmittal',
        nav: false
    }, {
        route: 'sendToDistributionList/:id',
        moduleId: 'panels/sendToDistributionList',
        title: 'Send To Distribution List',
        nav: false
    }, {
        route: 'boq/:isWidget',
        moduleId: 'commonLog',
        title: 'boq',
        nav: true,
        hash: '#boq',
        settings: { Contracts: true, caption: 'procoor-icon-BOQ', permission: 620 }
    }, {
        route: 'boqAddEdit/:id',
        moduleId: 'contracts/boqAddEdit',
        title: 'BOQ Addition',
        nav: false,
        settings: { Contracts: false }
    }, {
        route: 'qs/:isWidget',
        moduleId: 'commonLog',
        title: 'contractsQs',
        nav: true,
        hash: '#qs',
        settings: { Contracts: true, caption: 'procoor-icon-qauntity-survey', permission: 769 }
    }, {
        route: 'contractInfo/:isWidget',
        moduleId: 'commonLog',
        title: 'contracts',
        hash: '#contractInfo',
        nav: true,
        settings: { Contracts: true, caption: 'procoor-icon-contracts', permission: 143 }
    }, {
        route: 'contractInfoAddEdit/:id',
        moduleId: 'contracts/contractInfoAddEdit',
        title: ' contract Info ',
        nav: false,
        settings: { Contracts: false }
    }, {
        route: 'procurement/:isWidget',
        moduleId: 'commonLog',
        title: 'procurement',
        nav: true,
        hash: '#procurement',
        settings: { Contracts: true, caption: 'procoor-icon-procurement', permission: 170 }
    }, {
        route: 'procurementAddEdit/:id',
        moduleId: 'contracts/procurementAddEdit',
        title: 'Procurement',
        nav: false,
        settings: { Contracts: false }
    }, {
        route: 'pco/:isWidget',
        moduleId: 'commonLog',
        title: 'pco',
        nav: true,
        hash: '#pco',
        settings: { Contracts: true, caption: 'procoor-icon-PCO', permission: 152 }
    }, {
        route: 'pcoAddEdit/:id',
        moduleId: 'contracts/pcoAddEdit',
        title: ' contract PCO ',
        nav: false,
        settings: { Contracts: false }
    }, {
        route: 'qsAddEdit/:id',
        moduleId: 'contracts/qsAddEdit',
        title: 'Add contractsQs ',
        nav: false,
        settings: { Contracts: false }
    }, {
        route: 'requestPayments/:isWidget',
        moduleId: 'commonLog',
        title: 'paymentRequistionLog',
        nav: true,
        hash: '#requestPayments',
        settings: { Contracts: true, caption: 'procoor-icon-payment-requisitions', permission: 188 }
    }, {
        route: 'requestPaymentsAddEdit/:id',
        moduleId: 'contracts/requestPaymentsAddEdit',
        title: 'Payment Requistion Edit',
        nav: false,
        settings: { Contracts: false }
    }, {
        route: 'siteRequest/:isWidget',
        moduleId: 'commonLog',
        title: 'siteRequest',
        nav: true,
        hash: '#siteRequest',
        settings: { Contracts: true, caption: 'procoor-icon-site-request', permission: 120 }
    }, {
        route: 'siteRequestAddEdit/:id',
        moduleId: 'contracts/siteRequestAddEdit',
        title: 'Contract Site Request Edit',
        nav: false,
        settings: { Contracts: false }
    }, {
        route: 'variationRequest/:isWidget',
        moduleId: 'commonLog',
        title: 'variationRequest',
        nav: true,
        hash: '#variationRequest',
        settings: { Contracts: true }
    }, {
        route: 'variationRequestAddEdit/:id',
        moduleId: 'contracts/variationRequestAddEdit',
        title: 'Contract Variation Request Edit',
        nav: false,
        settings: { Contracts: false }
    }, {
        route: 'changeOrder/:isWidget',
        moduleId: 'commonLog',
        title: 'cos',
        nav: true,
        hash: '#changeOrder',
        settings: { Contracts: true, caption: 'procoor-icon-change-order', permission: 161 }
    }, {
        route: 'changeOrderAddEdit/:id',
        moduleId: 'contracts/changeOrderAddEdit',
        title: 'Change Order Addition',
        nav: false,
        settings: { Contracts: false }
    }, {
        route: 'costCodingTree/:isWidget',
        moduleId: 'commonLog',
        title: 'costCodingTree',
        nav: true,
        hash: '#costCodingTree',
        settings: { Contracts: true, caption: 'procoor-icon-cost-coding-tree', permission: 138 }
    }, {
        route: 'costCodingTreeAddEdit/:id',
        moduleId: 'contracts/costCodingTreeAddEdit',
        title: 'Cost Coding Tree Edit',
        nav: false,
        settings: { Contracts: false }
    }, {
        route: 'projectIssuesAddEdit/:id',
        moduleId: 'contracts/projectIssuesAddEdit',
        title: 'Issue Addition',
        nav: false,
        settings: { Contracts: false }
    }, {
        route: 'projectIssues/:isWidget',
        moduleId: 'commonLog',
        title: 'projectIssuesLog',
        nav: true,
        hash: '#projectIssues',
        settings: { Contracts: true, caption: 'procoor-icon-Issues', permission: 24 }
    }, {
        route: 'purchaseOrderAddEdit/:id',
        moduleId: 'contracts/purchaseOrderAddEdit',
        title: 'Issue Addition',
        nav: false,
        settings: { Contracts: false }
    }, {
        route: 'purchaseOrder/:isWidget',
        moduleId: 'commonLog',
        title: 'purchaseOrder',
        nav: true,
        hash: '#purchaseOrder',
        settings: { Contracts: true, caption: 'procoor-icon-purchase-order', permission: 179 }
    }, {
        //route: 'invoicesForPoAddEdit/:id/:projectId',
        route: 'invoicesForPoAddEdit/:id',
        moduleId: 'contracts/invoicesForPoAddEdit',
        title: 'Invoices Addition',
        nav: false,
        settings: { Contracts: false }
    }, {
        route: 'invoicesForPo/:isWidget',
        moduleId: 'commonLog',
        title: 'invoicesForPO',
        nav: true,
        hash: '#invoicesForPo',
        settings: { Contracts: true, caption: 'procoor-icon-invoices-for-PO', permission: 197 }
    }, {
        route: 'dailyReportsAddEdit/:id',
        moduleId: 'site/dailyReportsAddEdit',
        title: 'Daily Reports',
        nav: false,
        settings: { Site: false }
    }, {
        route: 'dailyReports',
        moduleId: 'commonLog',
        title: 'dailyReports',
        nav: true,
        hash: '#dailyReports',
        settings: { Site: true, permission: 269, caption: 'procoor-icon-daily-report' }
    }, {
        route: 'materialInspectionRequest',
        moduleId: 'commonLog',
        title: 'materialInspectionRequest',
        nav: true,
        hash: '#materialInspectionRequest',
        settings: { Site: true, permission: 934, caption: 'procoor-icon-material-inspection' }
    }, {
        route: 'materialInspectionRequestAddEdit/:id',
        moduleId: 'site/materialInspectionRequestAddEdit',
        title: 'Material Inspection Request',
        nav: true,
        settings: { Site: false }
    }, {
        route: 'drawing',
        moduleId: 'commonLog',
        title: 'drawing',
        nav: true,
        hash: '#drawing',
        settings: { Design: true, caption: 'procoor-icon-drawing', permission: 206 }
    }, {
        route: 'addEditDrawing/:id',
        moduleId: 'design/addEditDrawing',
        title: 'Drawing Addition',
        nav: false,
        settings: { Design: false }
    }, {
        route: 'submittal',
        moduleId: 'commonLog',
        title: 'Submittal',
        nav: true,
        hash: '#submittal',
        settings: { Site: true, permission: 224, caption: 'procoor-icon-submittal' }
    }, {
        route: 'submittalAddEdit/:id',
        moduleId: 'site/submittalAddEdit',
        title: 'Site Addition',
        nav: false,
        settings: { Site: false }
    }, {
        route: 'submittalSets',
        moduleId: 'commonLog',
        title: 'submittalSets',
        nav: true,
        hash: '#submittalSets',
        settings: { Site: true, permission: 233, caption: 'procoor-icon-submittal-approved' }
    }, {
        route: 'submittalSetsAddEdit/:id',
        moduleId: 'site/submittalSetsAddEdit',
        title: 'Submittal Set Addition',
        nav: false,
        settings: { Site: false }
    }, {
        route: 'drawingSets',
        moduleId: 'commonLog',
        title: 'drawingSets',
        nav: true,
        hash: '#drawingSets',
        settings: { Design: true, caption: 'procoor-icon-drawing-set', permission: 215 }
    }, {
        route: 'drawingSetsAddEdit/:id',
        moduleId: 'design/drawingSetsAddEdit',
        title: 'Drawing Set Addition',
        nav: false,
        settings: { Design: false }
    }, {
        route: 'drawingList',
        moduleId: 'commonLog',
        title: 'drawingList',
        nav: true,
        hash: '#drawingList',
        settings: { Design: true, caption: 'procoor-icon-drawing-list', permission: 305 }
    }, {
        route: 'siteInstructions',
        moduleId: 'commonLog',
        title: 'siteInstructions',
        nav: true,
        hash: '#siteInstructions',
        settings: { Site: true, permission: 639, caption: 'procoor-icon-site-instructions' }
    }, {
        route: 'siteInstructionsAddEdit/:id',
        moduleId: 'site/siteInstructionsAddEdit',
        title: 'Site Instructions Addition',
        nav: false,
        settings: { Site: false }
    }, {
        route: 'drawingListAddEdit/:id',
        moduleId: 'design/drawingListAddEdit',
        title: 'Drawing List Addition',
        nav: false,
        settings: { Design: false }
    }, {
        route: 'drawingPhases',
        moduleId: 'commonLog',
        title: 'drawingPhases',
        nav: true,
        hash: '#drawingPhases',
        settings: { Design: true, caption: 'procoor-icon-design-phasing', permission: 314 }
    }, {
        route: 'drawingPhasesAddEdit/:id',
        moduleId: 'design/drawingPhasesAddEdit',
        title: 'Drawing Phases Addition',
        nav: false,
        settings: { Design: false }
    }, {
        route: 'resourcesTree',
        moduleId: 'commonLog',
        title: 'resourcesTree',
        nav: true,
        hash: '#resourcesTree',
        settings: { Design: true, caption: 'procoor-icon-resources-tree', permission: 323 }
    }, {
        route: 'resourcesTreeEdit/:id',
        moduleId: 'design/resourcesTreeEdit',
        title: 'Resources Tree Addition',
        nav: false,
        settings: { Design: false }
    }, {
        route: 'materialRelease',
        moduleId: 'commonLog',
        title: 'materialRelease',
        nav: true,
        hash: '#materialRelease',
        settings: { Site: true, permission: 251, caption: 'procoor-icon-material-release' }
    }, {
        route: 'materialInventory',
        moduleId: 'commonlog',
        title: 'materialInventory',
        nav: true,
        hash: '#materialInventory',
        settings: { Site: true, permission: 618, caption: 'procoor-icon-project-inventory' }
    }, {
        route: 'materialInventoryAddEdit/:id',
        moduleId: 'site/materialInventoryAddEdit',
        title: 'Project Inventory Addition',
        nav: false,
        settings: { Site: false }
    }, {
        route: 'materialReleaseAddEdit/:id',
        moduleId: 'site/materialReleaseAddEdit',
        title: 'Material Release Addition',
        nav: false,
        settings: { Site: false }
    }, {
        route: 'materialDelivery',
        moduleId: 'commonLog',
        title: 'materialDelivery',
        nav: true,
        hash: '#materialDelivery',
        settings: { Site: true, permission: 242, caption: 'procoor-icon-material-delivery' }
    }, {
        route: 'materialDeliveryAddEdit/:id',
        moduleId: 'site/materialDeliveryAddEdit',
        title: 'Material Delivery Addition',
        nav: false,
        settings: { Site: false }
    }, {
        route: 'inspectionRequest',
        moduleId: 'commonLog',
        title: 'inspectionRequest',
        nav: true,
        hash: '#inspectionRequest',
        settings: { Site: true, permission: 370, caption: 'procoor-icon-inspection-request' }
    }, {
        route: 'inspectionRequestAddEdit/:id',
        moduleId: 'site/inspectionRequestAddEdit',
        title: 'Inspection Request Addition',
        nav: false,
        settings: { Site: false }
    }, {
        route: 'tenderAnalysis',
        moduleId: 'commonLog',
        title: 'tenderAnalysis',
        nav: true,
        hash: '#tenderAnalysis',
        settings: { Estimation: true, permission: 573, caption: 'procoor-icon-tender-analysis' }
    }, {
        route: 'tenderAnalysisAddEdit/:id',
        moduleId: 'estimation/tenderAnalysisAddEdit',
        title: 'Material Delivery Addition',
        nav: false,
        settings: { Estimation: false }
    }, {
        route: 'budgetFile',
        moduleId: 'commonLog',
        title: 'budgetFile',
        nav: true,
        hash: '#budgetFile',
        settings: { Estimation: true, permission: 689, caption: 'procoor-icon-budget-file' }
    }, {
        route: 'budgetFileAddEdit/:id',
        moduleId: 'estimation/budgetFileAddEdit',
        title: 'Budget File Addition',
        nav: false,
        settings: { Estimation: false }
    }, {
        route: 'budgetExpenses',
        moduleId: 'commonLog',
        title: 'budgetExpenses',
        nav: true,
        hash: '#budgetExpenses',
        settings: { Estimation: true, permission: 413, caption: 'procoor-icon-budgeted-expenses' }
    }, {
        route: 'punchList',
        moduleId: 'commonLog',
        title: 'punchList',
        nav: true,
        hash: '#punchList',
        settings: { Site: true, permission: 278, caption: 'procoor-icon-punch-list' }
    }, {
        route: 'punchListAddEdit/:id',
        moduleId: 'site/punchListAddEdit',
        title: 'Punch List Addition',
        nav: false,
        settings: { Site: false }
    }, {
        route: 'base',
        moduleId: 'commonLog',
        title: 'estimationBase',
        nav: true,
        hash: '#base',
        settings: { Estimation: true, permission: 581, caption: 'procoor-icon-estimation-base' }
    }, {
        route: 'baseAddEdit/:id',
        moduleId: 'estimation/baseAddEdit',
        title: 'Estimation Base Addition',
        nav: false,
        settings: { Estimation: false }
    }, {
        route: 'projectEstimate',
        moduleId: 'commonLog',
        title: 'projectEstimationTitle',
        nav: true,
        hash: '#projectEstimate',
        settings: { Estimation: true, permission: 595, caption: 'procoor-icon-project-estimate' }
    }, {
        route: 'projectEstimateAddEdit/:id',
        moduleId: 'estimation/projectEstimateAddEdit',
        title: 'Project Estimate Addition',
        nav: false,
        settings: { Estimation: false }
    }, {
        route: 'projectEstimateItemAddEdit/:id',
        moduleId: 'estimation/projectEstimateItemAddEdit',
        title: 'Project Estimate Item Addition',
        nav: false,
        settings: { Estimation: false }
    }, {
        route: 'clientModification/:isWidget',
        moduleId: 'commonLog',
        title: 'clientModificationLog',
        nav: true,
        hash: '#clientModification',
        settings: { Contracts: true, caption: 'procoor-icon-invoicesforPO', permission: 3137 }
    }, {
        route: 'clientModificationAddEdit/:id',
        moduleId: 'contracts/clientModificationAddEdit',
        title: 'Client Modification Addition',
        nav: false,
        settings: { Contracts: false }
    }, {
        route: 'qualityControl',
        moduleId: 'commonLog',
        title: 'qualityControl',
        nav: true,
        hash: '#qualityControl',
        settings: { Site: true, permission: 287, caption: 'procoor-icon-quality-control' }
    }, {
        route: 'qualityControlAddEdit/:id',
        moduleId: 'site/qualityControlAddEdit',
        title: 'Quality Control',
        nav: false,
        settings: { Site: false }
    }, {
        route: 'weeklyReports',
        moduleId: 'commonLog',
        title: 'weeklyReport',
        nav: true,
        hash: '#weeklyReports',
        settings: { Site: true, permission: 788, caption: 'procoor-icon-weekly-report' }
    }, {
        route: 'weeklyReportsAddEdit/:id',
        moduleId: 'site/weeklyReportsAddEdit',
        title: 'Weekly Report Addition',
        nav: false,
        settings: { Site: false }
    }, {
        route: 'clientSelection',
        moduleId: 'commonLog',
        title: 'clientSelectionLog',
        nav: true,
        hash: '#clientSelection',
        settings: { Site: true, permission: 'cs', caption: 'fa fa-signal' }
    }, {
        route: 'clientSelectionAddEdit/:id',
        moduleId: 'site/clientSelectionAddEdit',
        title: 'Client Selection Addition',
        nav: false,
        settings: { Site: false }
    }, {
        route: 'accountQualityControl',
        moduleId: 'accounts/accountQualityControl',
        title: 'qualityControl',
        nav: true,
        settings: { Accounts: true }
    }, {
        route: 'budgetVariance',
        moduleId: 'reports/budgetVariance',
        title: 'budgetVariance',
        nav: true,
        settings: { Reports: true, permission: 418 }
    }, {
        route: 'subContractor',
        moduleId: 'reports/subContractor',
        title: 'subContractor',
        nav: true,
        settings: { Reports: true, permission: 688 }
    }, {
        route: 'rptCostCodingTree',
        moduleId: 'reports/rptCostCodingTree',
        title: 'costCodingTree',
        nav: true,
        settings: { Reports: true, permission: 401 }
    }, {
        route: 'costCodingTreeReport/:id',
        moduleId: 'reports/costCodingTreeReport',
        title: 'Cost Coding Tree Report',
        nav: true,
        settings: { Reports: false }
    }, {
        route: 'paymentRequisitionQuantities',
        moduleId: 'reports/paymentRequisitionQuantities',
        title: 'paymentRequisitions',
        nav: true,
        settings: { Reports: true, permission: 685 }
    }, {
        route: 'designStatus',
        moduleId: 'reports/designStatus',
        title: 'designStatusReport',
        nav: true,
        settings: { Reports: true, permission: 380 }
    }, {
        route: 'boqQuantities',
        moduleId: 'reports/boqQuantities',
        title: 'boqQuantities',
        nav: true,
        settings: { Reports: true, permission: 686 }
    }, {
        route: 'taskStatus',
        moduleId: 'reports/taskStatus',
        title: 'taskStatus',
        nav: true,
        settings: { Reports: true, permission: 407 }
    }, {
        route: 'taskTimeSheet',
        moduleId: 'reports/taskTimeSheet',
        title: 'taskTimeSheet',
        nav: true,
        settings: { Tasks: true, permission: 546 }
    }, {
        route: 'designStatusRpt/:id',
        moduleId: 'reports/designStatusRpt',
        title: 'designStatusReport',
        nav: true,
        settings: { Reports: false }
    }, {
        route: 'invoiceQuantity',
        moduleId: 'reports/invoiceQuantity',
        title: 'invoiceQuantity',
        nav: true,
        settings: { Reports: true, permission: 691 }
    }, {
        route: 'MyTimeSheetUser',
        moduleId: 'logs/MyTimeSheetUser',
        title: 'timesheetLog',
        nav: true,
        settings: { permission: 334 }
    }, {
        route: 'usersWithOutTimeSheet',
        moduleId: 'reportCenter/usersWithOutTimeSheet',
        title: 'usersWithoutTimeSheet',
        nav: true,
        settings: { HumanResources: true, permission: 480 }
    }, {
        route: 'projectInvoices',
        moduleId: 'reportCenter/projectInvoices',
        title: 'projectInvoices',
        nav: true,
        settings: { ContractsPo: true, permission: 692 }
    }, {
        route: 'expnesesUserRequests',
        moduleId: 'reportCenter/expnesesUserRequests',
        title: 'expnesesUserRequests',
        nav: true,
        settings: { OtherReports: true, permission: 541 }
    }, {
        route: 'allocationOfUsersOnProjects',
        moduleId: 'reportCenter/allocationOfUsersOnProjects',
        title: 'userAllocationOnProjects',
        nav: true,
        settings: { ProjectReports: true, permission: 468 }
    }, {
        route: 'allocationOfProjectsOnCompanies',
        moduleId: 'reportCenter/allocationOfProjectsOnCompanies',
        title: 'projectsAllocationOnCompanies',
        nav: true,
        settings: { ProjectReports: true, permission: 469 }
    }, {
        route: 'collectedPaymentRequisition',
        moduleId: 'reportCenter/collectedPaymentRequisition',
        title: 'collectedPaymentRequisition',
        nav: true,
        settings: { ContractsPo: true, permission: 693 }
    }, {
        route: 'companyTimeSheet',
        moduleId: 'reportCenter/companyTimeSheet',
        title: 'companyTimeSheet',
        nav: true,
        settings: { HumanResources: true, permission: 481 }
    }, {
        route: 'timeSheetRpt',
        moduleId: 'reportCenter/timeSheetRpt',
        title: 'timeSheetReport',
        nav: true,
        settings: { HumanResources: true, permission: 480 }
    }, {
        route: 'projectBalanceReport',
        moduleId: 'reportCenter/projectBalanceReport',
        title: 'projectBalanceReport',
        nav: true,
        settings: { ProjectReports: true, permission: 472 }
    }, {
        route: 'projectsList',
        moduleId: 'reportCenter/projectsList',
        title: 'projectsList',
        nav: true,
        settings: { ProjectReports: true, permission: 471 }
    }, {
        route: 'taskEstimatedHoursVariance',
        moduleId: 'reportCenter/taskEstimatedHoursVariance',
        title: 'taskEstimatedHoursVariance',
        nav: true,
        settings: { Tasks: true, permission: 546 }
    }, {
        route: 'workFlowDocStatus',
        moduleId: 'reports/workFlowDocStatus',
        title: 'workFlow',
        nav: true,
        settings: { Reports: true, permission: 610 }
    }, {
        route: 'cashFlow',
        moduleId: 'reportCenter/cashFlow',
        title: 'cashFlow',
        nav: true,
        settings: { ProjectReports: true, permission: 902 }
    }, {
        route: 'projectTaskTree',
        moduleId: 'projects/projectTaskTree',
        title: 'taskTree',
        nav: true,
        settings: { Time: true, permission: 814, caption: 'procoor-icon-task-tree' }
    }, {
        route: 'myTasks',
        moduleId: 'projects/myTasks',
        title: 'myTasks',
        nav: true,
        settings: { UserProfile: true }
    }, {
        route: 'supervisorsWithUnapprovedTimeSheets',
        moduleId: 'reportCenter/supervisorsWithUnapprovedTimeSheets',
        title: 'supervisorsWithUnapprovedTimeSheets',
        nav: true,
        settings: { HumanResources: true, permission: 547 }
    }, {
        route: 'Ncr/:isWidget',
        moduleId: 'commonLog',
        title: 'NCRLog',
        nav: true,
        hash: '#Ncr',
        settings: { Communication: true, permission: 921, caption: 'procoor-icon-NCR' }
    }, {
        route: 'overTime',
        moduleId: 'reportCenter/overTime',
        title: 'overTimeSheet',
        nav: true,
        settings: { HumanResources: true, permission: 480 }
    }, {
        route: 'NCRAddEdit/:id',
        moduleId: 'communication/NCRAddEdit',
        title: 'NCR Addition',
        nav: false,
        settings: { Communication: false }
    }, {
        route: 'invoicesLogRpt',
        moduleId: 'accounts/invoicesLogRpt',
        title: 'invoicesReport',
        nav: true,
        settings: { ContractsPo: true, permission: 692 }
    }, {
        route: 'projectBackLog',
        moduleId: 'reportCenter/projectBackLog',
        title: 'projectsBackLog',
        nav: true,
        settings: { ProjectReports: true, permission: 471 }
    }, {
        route: 'projectsAchievements',
        moduleId: 'reportCenter/projectsAchievements',
        title: 'projectsAchievments',
        nav: true,
        settings: { ProjectReports: true, permission: 471 }
    }, {
        route: 'projectInvoicesCollected',
        moduleId: 'reportCenter/projectInvoicesCollected',
        title: 'projectedInvoicedCollecetd',
        nav: true,
        settings: { ProjectReports: true, permission: 692 }
    }, {
        route: 'correspondenceReceivedRpt',
        moduleId: 'accounts/correspondenceReceivedRpt',
        title: 'communicationCorrespondenceReceivedRpt',
        nav: true,
        settings: { GeneralConfig: true }
    }, {
        route: 'projectsWorkingHours',
        moduleId: 'reportCenter/projectsWorkingHours',
        title: 'workHours',
        nav: true,
        settings: { ProjectReports: true, permission: 471 }
    }, {
        route: 'purchaseOrderReport',
        moduleId: 'reportCenter/purchaseOrderReport',
        title: 'purchaseOrder',
        nav: true,
        settings: { ContractsPo: true, permission: 693 }
    }, {
        route: 'projectTypesTimeSheet',
        moduleId: 'reportCenter/projectTypesTimeSheet',
        title: 'projectTypesTimeSheet',
        nav: true,
        settings: { HumanResources: true, permission: 480 }
    }, {
        route: 'taskWorkLoad',
        moduleId: 'reportCenter/taskWorkLoad',
        title: 'taskWorkLoad',
        nav: true,
        settings: { Tasks: true, permission: 467 }
    }, {
        route: 'specSectionChild',
        moduleId: 'accounts/specSectionChild',
        title: 'specsSection',
        nav: true,
        settings: { Accounts: true }
    }, {
        route: 'chat',
        moduleId: 'reportCenter/chat',
        title: 'chat',
        nav: true,
        settings: { Chat: true }
    }, {
        route: 'termsLog',
        moduleId: 'accounts/termsLog',
        title: 'termsLog',
        nav: true,
        settings: { Accounts: true }
    }, {
        route: 'pOContractConfig',
        moduleId: 'accounts/pOContractConfig',
        title: 'pOandContractConfig',
        nav: true,
        settings: { Projects: true }
    }, {
        route: 'distbutionInboxMessage',
        moduleId: 'user/distbutionInboxMessage',
        title: 'distbutionMessage',
        nav: true,
        settings: { UserProfile: true }
    }, {
        route: 'internalMessages',
        moduleId: 'user/internalMessages',
        title: 'internalMessage',
        nav: true,
        settings: { UserProfile: true }
    }, {
        route: 'lateTimeSheet',
        moduleId: 'accounts/lateTimeSheet',
        title: 'lateTimeSheet',
        nav: true,
        settings: { User: true }
    }, {
        route: 'imapConfigurationSettings',
        moduleId: 'projects/imapConfigurationSettings',
        title: 'imap Configuration Settings',
        nav: true
    }, {
        route: 'options',
        moduleId: 'user/options',
        title: 'Options',
        nav: true
    }, {
        route: 'equipmentDelivery',
        moduleId: 'commonLog',
        title: 'equipmentDelivery',
        nav: true,
        hash: '#equipmentDelivery',
        settings: { Site: true, permission: 260, caption: 'procoor-icon-material-delivery' }
    }, {
        route: 'equipmentDeliveryAddEdit/:id',
        moduleId: 'site/equipmentDeliveryAddEdit',
        title: 'Equipment Delivery Addition',
        nav: true,
        settings: { Reports: false }
    }, {
        route: 'taskDetails/:id',
        moduleId: 'projects/taskDetails',
        title: 'Task Details',
        nav: true,
        settings: { Reports: false }
    }, {
        route: 'projectsFormAddEdit/:id',
        moduleId: 'projects/projectsFormAddEdit',
        title: 'projectsForms',
        nav: true,
        settings: { General: false }
    }];

    var currentModuleMenu = ko.observable();

    var isPageSetup = ko.observable(false);

    var pageSize = ko.observable(200);

    function getAuthenticationHeader() {
        var token = tokenStore.getToken();

        return !!token ? token : "";
    }

    var currentProject = ko.observable();

    var notificationCount = ko.observable(0);

    var taskCount = ko.observable(0);

    var profilePath = ko.observable("");

    var totalNotification = ko.observable(0);
    //ko.computed(function () {
    //    return taskCount() + notificationCount();
    //});

    var lastSelectedProject = ko.observable();

    var fromWidgetProject = ko.observable();

    var isCompany = ko.observable();

    var appComponants = ko.observableArray([]);

    var projectsMenue = ko.observableArray([]);

    var chatList = ko.observableArray([]);

    var projectName = ko.observable("");

    var currentLevel = ko.observable();

    var id = ko.observable();

    var selectedPanel = ko.observable("");

    var arrange = ko.observable();

    var docType = ko.observable();

    var currentdocApprovalId = ko.observable();

    function postJson(url, data) {
        return new window.Promise(function (resolve, reject) {

            var req = new XMLHttpRequest();
            req.open('POST', url, true);

            req.setRequestHeader("Content-type", "application/json");

            var token = tokenStore.getToken();
            if (token)
                req.setRequestHeader("Authorization", token);

            req.onload = function () {
                if (req.status == 200) {
                    resolve(this);
                }
                else {
                    reject(Error(req.statusText));
                }
            };

            req.onerror = function () {
                reject(Error("Network Error"));
            };

            req.send(JSON.stringify(data));
        });
    };

    //Jquery Validation Custom Validators
    (function ($) {
        //validates if value > 0
        $.validator.addMethod("greaterThanZero", function (value, element, param) {
            return this.optional(element) || parseFloat(value) > 0;
        }, "Please insert a value greater than Zero");

        $.validator.addMethod("dateFormat", function (value, element) {
            return value.match(/^\d\d?\/\d\d?\/\d\d\d\d$/);
        }, "Please enter a date in the format dd/mm/yyyy.");

        $.validator.addMethod('minOrEqual', function (value, el, param) {
            return parseFloat(value) >= param;
        }, "P");
    })(jQuery);

    var userPermissions = ko.observableArray([]);

    var timeSheetSettings = ko.observable();

    var language = JSON.parse(resources);

    var currentLanguage = ko.observable();

    var permission = ko.mapping.fromJS(JSON.parse(permissions)).authorization;

    if (localStorage.getItem('language')) {
        currentLanguage(localStorage.getItem('language'));
    } else {
        currentLanguage('en');
    }

    var isAllow = function (code) {
        if (currentProject() === undefined) {
            if (window.localStorage.getItem("lastSelectedProject") != null) {

                projectName(window.localStorage.getItem("lastSelectedprojectName"));
                currentProject(JSON.parse(window.localStorage.getItem("lastSelectedProject")));
            }
        }
        if (isCompany() === false) {
            var isAllowed = userPermissions.indexOf(code);
            if (isAllowed != -1) {
                return true;
            } else {
                return false;

            }
        } else {
            return true;
        }


    };

    var isDocApproval = ko.observable(false);

    var localization = language.jqxGridLanguage[currentLanguage()].localizationobj;

    var contactName = ko.observable("");

    var exportColumn = function (friendlyName, fieldName, type) {
        var self = this;

        self.title = friendlyName;
        self.key = fieldName;
        self.type = type;
    };

    var exportJson = function (jsonData, exportColumns, fileType, fileName) {
        if (fileType === 'excel') {
            exportService.excelExportingService(jsonData, exportColumns, 'Procoor Exporting Service - ' + fileName);
        } else if (fileType === 'pdf') {
            exportService.pdfExportingService(jsonData, exportColumns, 'Procoor Exporting Service - ' + fileName);
        } else if (fileType === 'word') {
            exportService.wordExportingService(jsonData, exportColumns, 'Procoor Exporting Service - ' + fileName);
        }
    };

    ko.bindingHandlers.datepicker = {
        init: function (element, valueAccessor, allBindingsAccessor) {
            var options = allBindingsAccessor().datepickerOptions || {};
            $(element).datepicker(options);

            ko.utils.registerEventHandler(element, "changeDate", function (event) {
                var value = valueAccessor();
                if (ko.isObservable(value)) {
                    value(!!event.target.value ? moment(event.date).format("DD/MM/YYYY") : '');
                }
            });
        },
        update: function (element, valueAccessor) {
            var value = ko.utils.unwrapObservable(valueAccessor());

            var val = !!value ? moment(value, "DD/MM/YYYY").format("DD-MM-YYYY") : '';

            if (val) {
                $(element).datepicker('update', val);
            }
        }
    };

    ko.bindingHandlers.DatePickerRange = {
        init: function (element, valueAccessor, allBindingsAccessor) {
            var startDate = allBindingsAccessor().startDate || ko.observable();

            var endDate = allBindingsAccessor().endDate || ko.observable();

            var twoDatesChanged = ko.observable(false);

            var options = {
                date: new Date(),
                current: new Date(),
                calendars: 1,
                mode: 'range',
                starts: 1,
                onChange: function (formated, dates) {
                    var pickerOptions = $(this).data('datepickero');

                    if (formated.length > 0) {
                        if (twoDatesChanged()) {
                            twoDatesChanged(false);
                            if (formated[0] !== formated[1]) {
                                $(pickerOptions.el).val(formated[0] + ' | ' + formated[1]);
                                startDate(formated[0]);
                                endDate(formated[1]);
                            }
                        } else {
                            twoDatesChanged(true);
                        }
                    } else {
                        $(pickerOptions.el).val('');
                        startDate(undefined);
                        endDate(undefined);
                    }
                }
            };

            $(element).DatePicker(options);
        }
    };

    //ko.bindingHandlers.select2 = {
    //    init: function (element, valueAccessor, allBindingsAccessor) {
    //        var obj = valueAccessor(),
    //            allBindings = allBindingsAccessor(),
    //            lookupKey = allBindings.lookupKey;

    //        obj.matcher = function (term, text, opt) {
    //            return text.toUpperCase().indexOf(term.toUpperCase()) >= 0 || opt.parent("optgroup").attr("label").toUpperCase().indexOf(term.toUpperCase()) >= 0;
    //        };

    //        $(element).select2(obj);

    //        if (lookupKey) {
    //            var value = ko.utils.unwrapObservable(allBindings.value);
    //            $(element).select2('data', ko.utils.arrayFirst(obj.data.results, function (item) {
    //                return item[lookupKey] === value;
    //            }));
    //        }

    //        ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
    //            $(element).select2('destroy');
    //        });
    //    },
    //    update: function (element) {
    //        $(element).trigger('change');
    //    }
    //};

    ko.bindingHandlers.select2 = {
        init: function (element, valueAccessor, allBindingsAccessor) {
            var obj = valueAccessor(),
                allBindings = allBindingsAccessor(),
                lookupKey = allBindings.lookupKey;

            obj.matcher = function (term, text, opt) {
                if (opt.parent("optgroup").length > 0) {

                    return text.toUpperCase().indexOf(term.toUpperCase()) >= 0 || opt.parent("optgroup").attr("label").toUpperCase().indexOf(term.toUpperCase()) >= 0;
                }

                return text.toUpperCase().indexOf(term.toUpperCase()) >= 0;
            };

            $(element).select2(obj);

            if (lookupKey) {
                var value = ko.utils.unwrapObservable(allBindings.value);

                $(element).select2('data', ko.utils.arrayFirst(obj.data.results, function (item) {
                    return item[lookupKey] === value;
                }));
            }

            if (allBindings.options) {
                allBindings.options.subscribe(function (v) {
                    if (v.length > 0) {
                        $(element).trigger('change');
                    }
                });
            }


            ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
                $(element).select2('destroy');
            });
        },
        update: function (element, valueAccessor, allBindingsAccessor) {
            var allBindings = allBindingsAccessor(),
            value = ko.utils.unwrapObservable(allBindings.value || allBindings.selectedOptions);

            if (allBindings.options) {
                if (value) {
                    if (allBindings.options().length > 0) {
                        $(element).select2('val', value);
                    }
                }
            } else {
                $(element).trigger('change');
            }
        }
    };

    ko.bindingHandlers.iCalendar = {
        init: function (element, valueAccessor, allBindingsAccessor) {
            var obj = valueAccessor();

            if (obj().length > 0) {
                var iCalendar = $(element).calendar({
                    tmpl_path: "/app/views/templates/calendar/",
                    events_source: obj()
                });

                $('.btn-group button[data-calendar-nav]').each(function () {
                    var $this = $(this);
                    $this.click(function () {
                        iCalendar.navigate($this.data('calendar-nav'));
                    });
                });

                $('.btn-group button[data-calendar-view]').each(function () {
                    var $this = $(this);
                    $this.click(function () {
                        iCalendar.view($this.data('calendar-view'));
                    });
                });
            }
        },
        update: function (element, valueAccessor) {
            var obj = valueAccessor();

            if (obj().length > 0) {
                var iCalendar = $(element).calendar({
                    tmpl_path: "/app/views/templates/calendar/",
                    events_source: obj()
                });

                $('.btn-group button[data-calendar-nav]').each(function () {
                    var $this = $(this);
                    $this.click(function () {
                        iCalendar.navigate($this.data('calendar-nav'));
                    });
                });

                $('.btn-group button[data-calendar-view]').each(function () {
                    var $this = $(this);
                    $this.click(function () {
                        iCalendar.view($this.data('calendar-view'));
                    });
                });
            }
        }
    };

    ko.bindingHandlers.daterangepicker = {
        update: function (element, valueAccessor) {
            var value = valueAccessor();

            var valueUnwrapped = ko.unwrap(value);

            $(element).daterangepicker({
                ranges: {
                    'Today': [moment(), moment()],
                    'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                    'Last 7 Days': [moment().subtract(6, 'days'), moment()],
                    'Last 30 Days': [moment().subtract(29, 'days'), moment()],
                    'This Month': [moment().startOf('month'), moment().endOf('month')],
                    'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
                },
                startDate: moment(),
                endDate: moment()
            }, function (start, end) {
                $(element).children("span").text(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
            });

            $(element).on('apply.daterangepicker', function (ev, picker) {
                valueUnwrapped.startDate(picker.startDate);
                valueUnwrapped.endDate(picker.endDate);

                value.valueHasMutated();
            });
        }
    };

    ko.bindingHandlers.chart = {
        update: function (element, valueAccessor, allBindingsAccessor) {
            var options = allBindingsAccessor().chartOptions() || {};

            var value = valueAccessor();

            var valueUnwrapped = ko.unwrap(value);

            if (valueUnwrapped.length > 0) {
                if ($(element).data('highcharts-chart')) {
                    $(element).highcharts().destroy();
                }

                $(element).highcharts(options);
            }
        }
    };

    ko.bindingHandlers.setWidget = {
        init: function (element, valueAccessor) {
            var observable = valueAccessor();

            if (!observable()) {
                observable(true);
            }
        }
    };

    ko.bindingHandlers.unsetWidget = {
        init: function (element, valueAccessor) {
            var observable = valueAccessor();

            if (observable()) {
                observable(false);
            }
        }
    };

    ko.bindingHandlers.bootstrapSwitch = new function () {
        this.init = function (element, valueAccessor, allBindingsAccessor) {
            //initialize bootstrapSwitch
            $(element).bootstrapSwitch();

            // setting initial value
            $(element).bootstrapSwitch('state', valueAccessor()());

            //handle the field changing
            $(element).on('switchChange.bootstrapSwitch', function (event, state) {
                var observable = valueAccessor();

                observable(state);
            });

            // Adding component options
            var options = allBindingsAccessor().bootstrapSwitchOptions || {};

            for (var property in options) {
                if (options.hasOwnProperty(property)) {
                    $(element).bootstrapSwitch(property, ko.utils.unwrapObservable(options[property]));
                }
            }

            //handle disposal (if KO removes by the template binding)
            ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
                $(element).bootstrapSwitch("destroy");
            });

        }
        //update the control when the view model changes
        this.update = function (element, valueAccessor, allBindingsAccessor) {
            var value = ko.utils.unwrapObservable(valueAccessor());

            // Adding component options
            var options = allBindingsAccessor().bootstrapSwitchOptions || {};

            for (var property in options) {
                if (options.hasOwnProperty(property)) {
                    $(element).bootstrapSwitch(property, ko.utils.unwrapObservable(options[property]));
                }
            }

            $(element).bootstrapSwitch("state", value);
        }
    };

    var guid = (function (s4) {
        return function () {
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
        };
    })(function () {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    });

    ko.bindingHandlers.progress = {
        init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            var $element = $(element);

            var progressColor = allBindingsAccessor().progressColor || 'progress-info';

            var bar = $('<div/>', {
                'class': 'progress-bar'
            }).css("width", valueAccessor()() + '%');

            bar.tooltip({
                container: 'body',
                title: valueAccessor()() + '%'
            });

            $element.attr('id', guid())
                .addClass('progress ' + progressColor)
                .append(bar);

            ko.applyBindingsToDescendants(viewModel, $element[0]);
        }
    };

    ko.bindingHandlers.booleanValue = {
        init: function (element, valueAccessor) {
            var observable = valueAccessor(),
                interceptor = ko.computed({
                    read: function () {
                        if (observable()) {
                            return observable().toString();
                        } else {
                            return "";
                        }
                    },
                    write: function (newValue) {
                        if ((newValue === "true") || (newValue === "false")) {
                            observable(newValue === "true");
                        } else {
                            observable("");
                        }
                    }
                });

            ko.applyBindingsToNode(element, { value: interceptor });
        }
    };

    var grid = function () {
        var self = this;

        self.data = ko.observableArray();
        self.width = ko.observable(1);
        self.hierarchy = ko.observable();
    };

    var jqxGridDataSource = function () {
        var self = this;

        self.datatype = "observablearray";
        self.id = 'id';
    };

    var jqxGridColumns = function () {
        var self = this;

        self.gridColumns = ko.observableArray();
    };

    var jqxGridColumnGroups = function () {
        var self = this;

        self.gridColumnGroups = ko.observable();
    };

    var jqxGroups = function () {
        var self = this;

        self.groups = ko.observableArray();
    };

    //var jqxShowHideColumns = function (obj, event) {
    //    var id = "#" + event.currentTarget.id;
    //    var value = $(id).val();

    //    var gridId = "#" + $(id).data("grid-id");

    //    $(gridId).jqxGrid('beginupdate');

    //    if (!event.currentTarget.checked) {
    //        $(gridId).jqxGrid('hidecolumn', event.currentTarget.id);
    //    }
    //    else {
    //        $(gridId).jqxGrid('showcolumn', event.currentTarget.id);
    //    }

    //    $(gridId).jqxGrid('endupdate');
    //};

    var pageExport = ko.observable();

    var pageTemplate = ko.observable();

    var exportDocumentToPdf = function (pathFooter, pathHeader) {
        //#main 
        $("body").css("overflow", "visible");

        //$("#LettersDocument .export-remove").addClass("hidden");
        $(pageExport()).addClass("hidden");
        var content = $('.main-content-animation');

        content.removeClass('main-content-animation');

        snapShotDom($(pageTemplate()).get(0), function (canvas, currentHeight) {
            var imgData = canvas.toDataURL('image/jpeg');

            var doc = new jsPDF('p', 'pt', 'a4');

            var img = new Image();

            // img.src = pathHeader;
            if (pathHeader()) {

                img.src = pathHeader();
            } else {
                img.src = '../img/superbox/superbox-full-23.jpg';
            }
            img.onload = function () {
                var canvas = document.createElement("canvas");
                canvas.width = this.width;
                canvas.height = this.height;

                var ctx = canvas.getContext("2d");
                ctx.drawImage(this, 0, 0);


                var dataUrl = canvas.toDataURL("image/jpeg");

                var img2 = new Image();
                if (pathFooter()) {

                    img2.src = pathFooter();
                } else {
                    img2.src = '../img/superbox/superbox-full-15.jpg';
                }

                img2.onload = function () {
                    var canvas2 = document.createElement("canvas");
                    canvas2.width = this.width;
                    canvas2.height = this.height;

                    var ctx2 = canvas2.getContext("2d");
                    ctx2.drawImage(this, 0, 0);


                    var data2Url = canvas2.toDataURL("image/jpeg");

                    doc.addImage(dataUrl, 'JPEG', 15, 15, 565, 65);

                    doc.addImage(imgData, 'JPEG', 15, 80, 565, 680);

                    doc.addImage(data2Url, 'JPEG', 15, 760, 565, 65);

                    doc.save(pageTemplate());
                }
            }
        });

        $("body").css("overflow", "auto");
        $("body").css("overflow-x", "hidden");

        $(pageExport()).removeClass("hidden");

        $('.modal').modal('hide');

    };

    function snapShotDom(target, call) {
        var data = {};

        data.overflow = $(target).css('overflow');
        data.width = $(target).css('width');
        data.height = $(target).css('height');
        data.maxWidth = $(target).css('max-width');
        data.maxHeight = $(target).css('max-height');

        var attachmentsArea = $('#' + target.id + ' .col-md-1.col-xs-1.col-sm-1.col-lg-1.col');

        attachmentsArea.removeClass('col-md-1 col-xs-1 col-sm-1 col-lg-1 col');
        attachmentsArea.addClass('col-md-2 col-xs-2 col-sm-2 col-lg-2 col');

        var workflowArea = $('#' + target.id + ' .inbox-download-list .well-sm.well-flow');

        workflowArea.attr('style', 'width: 42px !important');
        workflowArea.find('.fa.fa-pencil-square-o').css('font-size', '25px');
        workflowArea.find('strong').css('font-size', '8px');

        $(target).css('overflow', 'visible');
        $(target).css('height', 'auto');
        $(target).css('width', '595.2756px');
        $(target).css('maxHeight', 'auto');

        html2canvas(target, {
            "onrendered": function (canvas) {
                var currentHeight = ($(target).height() * 72) / 96;

                $(target).css('overflow', data.overflow);
                $(target).css('width', data.width);
                $(target).css('height', data.height);
                $(target).css('maxWidth', data.maxWidth);
                $(target).css('maxHeight', data.maxHeight);

                attachmentsArea.removeClass('col-md-2 col-xs-2 col-sm-2 col-lg-2 col');
                attachmentsArea.addClass('col-md-1 col-xs-1 col-sm-1 col-lg-1 col');

                workflowArea.removeAttr('style');
                workflowArea.find('.fa.fa-pencil-square-o').removeAttr('style');
                workflowArea.find('strong').removeAttr('style');

                call(canvas, currentHeight);
            }
        });
    }

    var createShowHideFooterToolbar = function (myTable, columns) {
        var toolbarId = 'myToolbar';
        var settingsId = toolbarId + '_settings';
        var colsDef = myTable.jqxGrid('columns').records;
        var checkbox;

        // increase table pager height to make room for the toolbar
        myTable.jqxGrid('pagerheight', 38);

        // create HTML markup for the toolbar with a settings button and a table filtering input control
        var toolbarList = $('<ul />');
        var mToolbar = $('<div id="' + toolbarId + '" class="gridToolbar" />');
        mToolbar.append(toolbarList);

        // add settings menu to the toolbar
        toolbarList.append('<li id="' + settingsId + '" style="padding: 1px 4px;">' + 'Show/Hide Columns...' + '<ul style="width:440px">' + '<div class="gridSettingsHeader"><b>Show/Hide Columns</b></div>' + '</ul>' + '</li>');

        // Add one checkbox to settings menu for each column that can be shown/hidden
        var settings = mToolbar.find('#' + settingsId + ' ul');

        for (var idx = 0; idx < columns.length; idx++) {
            // create checkbox HTML markup
            checkbox = $('<div style="float:left;margin-left: 10px;text-overflow:ellipsis;overflow:hidden" df="' + columns[idx].datafield + '">' + columns[idx].text + '</div>');
            settings.append(checkbox);

            // convert it into jqx checkbox
            checkbox.jqxCheckBox({
                width: 130,
                height: 25,
                checked: (columns[idx].hidden !== true)
            });

            // register the on-change handler for toggling column visibility
            checkbox.on('change', function (event) {
                if (event.args.checked) {
                    myTable.jqxGrid('showcolumn', $(this).attr('df'));
                } else {
                    myTable.jqxGrid('hidecolumn', $(this).attr('df'));
                }
            });
        }

        // add the toolbar to the data table
        myTable.find('.jqx-grid-pager').append(mToolbar);

        if (myTable.find(".load-more").length === 0) {
            var toolbar = myTable.find('.jqx-grid-pager');
            var container = $("<div class='btn-group' role='group' style='margin-top: 5px; margin-left: 5px; position: absolute; top: 3px; left: 185px; width: 100px;'></div>");
            var loadMoreButton = $("<button type='button' class='btn btn-xs btn-default load-more'><i class='fa fa-download'></i></button>");
            var loadingData = $("<div class='hidden loading-data'></div>");
            var loadingSpan = $("<span style='margin-left: 5px;'>Loading</span>");
            var loadingIcon = $("<i style='margin-left: 8px; margin-top: 5px; color: darkcyan' class='fa fa-refresh fa-spin'></i>");
            toolbar.append(container);
            container.append(loadMoreButton);
            container.append(loadingData);
            loadingData.append(loadingSpan);
            loadingData.append(loadingIcon);
        }

        mToolbar.jqxMenu({
            width: (180),
            height: 25,
            autoOpen: false
        });

        mToolbar.jqxMenu('setItemOpenDirection', settingsId, 'right', 'up');
        mToolbar.jqxMenu('showTopLevelArrows', false);
    }

    ko.bindingHandlers.jqxGrid = {
        init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {

            var dataSource = allBindings().jqxGridDataSource || {};

            var columns = allBindings().jqxGridColumns || {};

            var groups = allBindings().jqxGroups || {};

            var adapter = allBindings().adapter || ko.observable();

            var groupsExist = !!groups.groups;

            if (!groupsExist) {
                groups.groups = ko.observableArray([]);
            }

            var value = valueAccessor();

            var valueUnwraped = ko.unwrap(value);

            dataSource.localdata = valueUnwraped.data;

            var dataAdapter = new $.jqx.dataAdapter(dataSource);

            adapter(dataAdapter);

            var width = $(element).parent().width();

            $(element).jqxGrid({
                theme: "bootstrap",
                source: dataAdapter,
                altrows: true,
                sortable: true,
                pageable: true,
                showfilterrow: true,
                filterable: true,
                columnsresize: true,
                columnsreorder: true,
                selectionmode: 'none',
                showsortmenuitems: false,
                showfiltermenuitems: true,
                showgroupmenuitems: false,
                groupable: true,
                localization: localization,
                autosavestate: true,
                width: '95.5%',
                autoheight: true,
                scrollmode: 'deferred',
                rowsheight: 45,
                pagerheight: 52,
                columnsheight: 37,
                pagermode: 'advanced',
                autoloadstate: true,
                rendered: function (event) {
                    $(element).jqxGrid('refreshfilterrow');
                },
                ready: function (event) {
                    $(element).jqxGrid({ width: '99.5%' });
                },
                columns: columns.gridColumns(),
                groups: groups.groups(),
                rtl: language.rtl[currentLanguage()]
            });

            createShowHideFooterToolbar($(element), columns.gridColumns());
        }
    };

    ko.bindingHandlers.jqxGridTree = {
        init: function (element, valueAccessor, allBindings) {
            var dataSource = allBindings().jqxGridDataSource || {};

            var columns = allBindings().jqxGridColumns || {};

            var value = valueAccessor();

            var valueUnwraped = ko.unwrap(value);

            dataSource.hierarchy = valueUnwraped.hierarchy;

            dataSource.localdata = valueUnwraped.data;

            var cols = columns.gridColumns();

            var dataAdapter = new $.jqx.dataAdapter(dataSource);

            $(element).jqxTreeGrid({
                source: dataAdapter,
                pageable: true,
                columnsResize: true,
                sortable: true,
                filterable: true,
                filterMode: 'advanced',
                columns: cols,
                pagerHeight: 52,
                columnsHeight: 52,
                width: '100%',
                altRows: true,
                pagerMode: 'advanced',
                rtl: language.rtl[currentLanguage()]
            });
        }
    };

    var koGridInstanceCreator = function () {
        var gridOptions = ko.observable({});

        var currentFilteredData = ko.observableArray([]);

        var appliedFilters = ko.observableArray([]);

        var filterString = function (value, field, filteredData) {
            filteredData(ko.utils.arrayFilter(filteredData(), function (item) {
                return item[field] && item[field].toString().toLowerCase().indexOf(value) !== -1;
            }));

            var pagedData = filteredData();

            if (filteredData() > 20) {
                pagedData = filteredData().slice(((1 + 1) - 1) * 20, (1 + 1) * 20);
            }

            currentFilteredData(pagedData);
        };

        var filterInteger = function (value, field, filteredData) {
            filteredData(ko.utils.arrayFilter(filteredData(), function (item) {
                var number = parseInt(value);

                if (!number) {
                    return true;
                }

                return item[field] && (item[field] === number);
            }));

            var pagedData = filteredData();

            if (filteredData() > 20) {
                pagedData = filteredData().slice(((1 + 1) - 1) * 20, (1 + 1) * 20);
            }

            currentFilteredData(pagedData);
        };

        var filterDate = function (value, field, filteredData) {
            if (value.endDate() && value.startDate()) {
                var startDate = moment(value.startDate(), "YYYY-MM-DD");
                var endDate = moment(value.endDate(), "YYYY-MM-DD");

                filteredData(ko.utils.arrayFilter(filteredData(), function (item) {
                    var date = moment(item[field]).format("DD/MM/YYYY");

                    return moment(date, "DD/MM/YYYY").isBetween(startDate, endDate) || (moment(date, "DD/MM/YYYY").diff(startDate, 'days') === 0) || (moment(date, "DD/MM/YYYY").diff(endDate, 'days') === 0);
                }));

                var pagedData = filteredData();

                if (filteredData() > 20) {
                    pagedData = filteredData().slice(((1 + 1) - 1) * 20, (1 + 1) * 20);
                }

                currentFilteredData(pagedData);
            } else if (!(value.endDate() && value.startDate())) {
                var filterExist = ko.utils.arrayFirst(appliedFilters(), function (item) {
                    return item.fieldValue === field;
                });

                appliedFilters.remove(filterExist);
            }
        };

        var filterBoolean = function (value, field, filteredData) {

            if (field === 'statusName') {
                if (value || (typeof value === 'boolean')) {
                    value = value ? language.oppened[currentLanguage()] : language.closed[currentLanguage()];
                } else {
                    value = null;
                }
            }

            if (field === 'readUnread') {
                if (value || (typeof value === 'boolean')) {
                    value = value ? language.read[currentLanguage()] : language.unRead[currentLanguage()];
                } else {
                    value = null;
                }
            }

            filteredData(ko.utils.arrayFilter(filteredData(), function (item) {
                return item[field] && (value === item[field]);
            }));

            var pagedData = filteredData();

            if (filteredData() > 20) {
                pagedData = filteredData().slice(((1 + 1) - 1) * 20, (1 + 1) * 20);
            }

            currentFilteredData(pagedData);
        };

        var originalData = ko.observableArray([]);

        var filteredData = ko.observableArray();

        var applyFilters = function () {
            currentFilteredData(originalData());

            filteredData(originalData());

            if (appliedFilters().length < 1) {
                gridOptions().pagingOptions.totalServerItems(currentFilteredData().length);
                gridOptions().pagingOptions.currentPage(0);
                gridOptions().pagingOptions.currentPage(1);
            }

            var totalAppliedFilters = 0;

            ko.utils.arrayForEach(appliedFilters(), function (item, index) {
                if (item.value || (typeof item.value === 'boolean')) {
                    if (item.filterType === 'string') {
                        filterString(item.value.toLowerCase(), item.fieldValue, currentFilteredData);
                    } else if (item.filterType === 'int') {
                        filterInteger(item.value, item.fieldValue, currentFilteredData);
                    } else if (item.filterType === 'date') {
                        filterDate(item.value, item.fieldValue, currentFilteredData);
                    } else if (item.filterType === 'status') {
                        filterBoolean(item.value, item.fieldValue, currentFilteredData);
                    }

                    totalAppliedFilters++;
                } else {
                    if (index === (appliedFilters().length - 1)) {
                        if (totalAppliedFilters === 0) {
                            totalAppliedFilters = false;
                        }
                    }
                }
            });

            if (totalAppliedFilters) {
                gridOptions().pagingOptions.totalServerItems(currentFilteredData().length);
                filteredData(currentFilteredData());
                gridOptions().pagingOptions.currentPage(0);
                gridOptions().pagingOptions.currentPage(1);
            }
        };

        appliedFilters.subscribe(function (value) {
            applyFilters();
        });

        var headerCellTemplate = function (filterType, fieldValue, filterValue) {
            filterValue.subscribe(function (value) {
                var filterObject = { filterType: filterType, value: value, fieldValue: fieldValue };

                var filterExist = ko.utils.arrayFirst(appliedFilters(), function (item) {
                    return item.fieldValue === fieldValue;
                });

                if (!filterExist) {
                    appliedFilters.push(filterObject);
                } else {
                    var filterObjectIndex = appliedFilters.indexOf(filterExist);

                    if (value || (typeof value === 'boolean')) {
                        appliedFilters()[filterObjectIndex].value = value;
                        appliedFilters.valueHasMutated();
                    } else {
                        appliedFilters.remove(filterExist);
                    }
                }
            });

            var filterTemplate = '';

            if (filterType === 'string') {
                filterTemplate = '<input class="form-control" data-filter="' + filterType + '" style="margin: 3px; width: 63%;" data-bind="attr: { \'placeholder\': displayName() + \'...\' }, textInput: filterValue" type="text" />';
            } else if (filterType === 'int') {
                filterTemplate = '<input class="form-control" data-filter="' + filterType + '" style="margin: 3px; width: 82%;" data-bind="attr: { \'placeholder\': displayName() + \'...\' }, textInput: filterValue" type="number" />';
            } else if (filterType === 'docNo') {
                filterTemplate = '<input class="form-control" data-filter="' + filterType + '" style="margin: 3px; width: 82%;" data-bind="attr: { \'placeholder\': displayName() + \'...\' }, textInput: filterValue" type="text" />';
            } else if (filterType === 'date') {
                filterValue().startDate.subscribe(function (value) {
                    filterValue.valueHasMutated();
                });

                filterValue().endDate.subscribe(function (value) {
                    filterValue.valueHasMutated();
                });
                filterTemplate = '<div style="margin: 3px"><input readonly style="cursor: pointer !important;" placeholder="' + language.filterHere[currentLanguage()] + '" class="form-control" data-bind="DatePickerRange: true, startDate: filterValue().startDate, endDate: filterValue().endDate" type="text" /></div>';
            } else if (filterType === 'status') {
                filterTemplate = '<div style="margin: 3px; width: 57%;"><select class="form-control" data-bind="booleanValue: filterValue" required><option>' + language.all[currentLanguage()] + '</option> <option value="true">' + language.oppened[currentLanguage()] + '</option><option value="false">' + language.closed[currentLanguage()] + '</option></select></div>';
            }

            return '<div><div style="border-bottom: 1px solid rgb(212,212,212);" data-bind="click: sort, css: {\'kgSorted\': !noSortVisible }, attr: {\'class\': \'kgHeaderSortColumn \' + headerClass()}" draggable="true"><div data-bind="attr: { \'class\': \'colt\' + $index() + \' kgHeaderText\' }, html: displayName"></div><div class="kgSortButtonDown" data-bind="visible: showSortButtonDown" style="display: none;"></div><div class="kgSortButtonUp" data-bind="visible: showSortButtonUp" style="display: none;"></div><div data-bind="visible: resizable, click: gripClick, mouseEvents: { mouseDown: gripOnMouseDown }" class="kgHeaderGrip"></div></div>' + filterTemplate + '</div>';
        };

        var gridCheckBoxes = ko.observableArray([]);

        var checkedRows = ko.observableArray([]);

        var createColumnDefinition = function (field, displayName, minWidth, width, filterType, cellFormat, cellTemplate, visible, headerCellTemp) {
            var columnDef = {
                field: field,
                displayName: displayName,
                minWidth: minWidth,
                width: width,
                filterValue: ko.observable(),
                filterType: filterType,
                headerCellTemplate: '',
                gridCheckBoxes: gridCheckBoxes,
                checkedRows: checkedRows
            };

            if (filterType === 'date') {
                columnDef.filterValue({
                    startDate: ko.observable(),
                    endDate: ko.observable()
                });
            }

            if (cellFormat) {
                columnDef.cellFormatter = cellFormat;
            }

            if (cellTemplate) {
                columnDef.cellTemplate = cellTemplate;
            }

            if (visible !== false) {
                columnDef.visible = true;
            } else {
                columnDef.visible = false;
            }

            if (filterType && !headerCellTemp) {
                var headerTemplate = headerCellTemplate(filterType, field, columnDef.filterValue);

                columnDef.headerCellTemplate = headerTemplate;
            } else {
                if (headerCellTemp) {
                    columnDef.headerCellTemplate = headerCellTemp;
                }
            }

            return columnDef;
        };

        var loadMoreData = ko.observable();

        loadMoreData.subscribe(function (value) {
            gridOptions().loadMoreData = value;
        });

        gridOptions({
            data: currentFilteredData,
            pagingOptions: {
                pageSizes: ko.observableArray([20, 100, 200]),
                pageSize: ko.observable(20),
                totalServerItems: ko.observable(0),
                currentPage: ko.observable(0)
            },
            enableColumnResize: true,
            enablePaging: true,
            enableRowReordering: true,
            enableSorting: true,
            showGroupPanel: true,
            multiSelect: false,
            showFilter: false,
            titleOfGroupingArea: localization.groupsheaderstring,
            currentLanguage: currentLanguage,
            displaySelectionCheckbox: true,
            afterSelectionChange: function () { },
            headerRowHeight: 68,
            columnDefs: [],
            isLoadingData: ko.observable(true),
            groups: [],
            loadMoreData: function (obj, e) {

            },
            columnsChanged: function (obj) {

            }
        });

        var displaySelectionCheckbox = ko.observable();

        displaySelectionCheckbox.subscribe(function (value) {
            gridOptions().displaySelectionCheckbox = value;
        });

        var multiSelect = ko.observable();

        multiSelect.subscribe(function (value) {
            gridOptions().multiSelect = value;
        });

        var groups = ko.observableArray([]);

        groups.subscribe(function (value) {
            gridOptions().groups = value;
        });

        var selectWithCheckboxOnly = ko.observableArray([]);

        selectWithCheckboxOnly.subscribe(function (value) {
            gridOptions().selectWithCheckboxOnly = value;
        });

        var columnDefs = ko.observableArray([]);

        columnDefs.subscribe(function (value) {
            gridOptions().columnDefs = value;
        });

        var gridSelectionChange = ko.observable();

        gridSelectionChange.subscribe(function (value) {
            gridOptions().afterSelectionChange = value;
        });

        gridOptions().pagingOptions.currentPage.subscribe(function (value) {
            var pages = filteredData().length / gridOptions().pagingOptions.pageSize();
            var ceiledPages = Math.ceil(filteredData().length / gridOptions().pagingOptions.pageSize());
            var pageSize = gridOptions().pagingOptions.pageSize();
            var currentGridPage = value;

            var pagedData = [];

            if (ceiledPages === value) {
                if (pages < ceiledPages) {
                    pagedData = filteredData().slice((currentGridPage - 1) * ((pages % 1) * pageSize), currentGridPage * ((pages % 1) * pageSize));
                } else {
                    pagedData = filteredData().slice((currentGridPage - 1) * pageSize, currentGridPage * pageSize);
                }
            } else {
                pagedData = filteredData().slice((currentGridPage - 1) * pageSize, currentGridPage * pageSize);
            }

            currentFilteredData(pagedData);
        });

        gridOptions().pagingOptions.pageSize.subscribe(function (value) {
            if (gridOptions().pagingOptions.currentPage() === 1) {
                var pages = filteredData().length / value;
                var ceiledPages = Math.ceil(filteredData().length / value);
                var pageSize = value;
                var currentGridPage = gridOptions().pagingOptions.currentPage();

                var pagedData = [];

                if (ceiledPages === currentGridPage) {
                    if (pages < ceiledPages) {
                        pagedData = filteredData().slice((currentGridPage - 1) * ((pages % 1) * pageSize), currentGridPage * ((pages % 1) * pageSize));
                    } else {
                        pagedData = filteredData().slice((currentGridPage - 1) * pageSize, currentGridPage * pageSize);
                    }
                } else {
                    pagedData = filteredData().slice((currentGridPage - 1) * pageSize, currentGridPage * pageSize);
                }

                currentFilteredData(pagedData);
            } else {
                gridOptions().pagingOptions.currentPage(1);
            }
        });

        var setInitialData = function (data) {
            originalData(data);

            currentFilteredData(data);

            applyFilters();

            gridOptions().pagingOptions.totalServerItems(originalData().length);
            gridOptions().pagingOptions.currentPage(0);
            gridOptions().pagingOptions.currentPage(1);

            if (typeof data === "function") {
                if (data().length > 0) {
                    gridOptions().isLoadingData(null);
                } else {
                    gridOptions().isLoadingData(false);
                }
            } else {
                if (data.length > 0) {
                    gridOptions().isLoadingData(null);
                } else {
                    gridOptions().isLoadingData(false);
                }
            }
        };

        var loadMoreRecords = function (data) {
            var arr = originalData();

            ko.utils.arrayPushAll(arr, data);

            originalData(arr);

            currentFilteredData(arr);

            applyFilters();

            gridOptions().pagingOptions.totalServerItems(originalData().length);
            gridOptions().pagingOptions.currentPage(0);
            gridOptions().pagingOptions.currentPage(1);
        };

        var getOriginalData = function () {
            return originalData;
        }

        var getFilteredData = function () {
            return currentFilteredData;
        }

        var getGridOptions = function () {
            return gridOptions;
        };

        var addRow = function (item) {

            originalData.push(item);

            //currentFilteredData.push(item);

            gridOptions().data.push(item);

            gridOptions().pagingOptions.totalServerItems(currentFilteredData().length);

        };

        var updateRow = function (itemUpdate) {
            var item = ko.utils.arrayFirst(originalData(), function (item) {
                return item.id === itemUpdate.id;
            });

            originalData.remove(item);
            currentFilteredData.remove(item);
            gridOptions().data.remove(item);


            originalData.push(itemUpdate);

            gridOptions().data.push(itemUpdate);

            gridOptions().pagingOptions.totalServerItems(currentFilteredData().length);

        };

        var deleteRow = function (id) {
            var item = ko.utils.arrayFirst(originalData(), function (item) {
                return item.id === id;
            });

            originalData.remove(item);
            currentFilteredData.remove(item);
            gridOptions().data.remove(item);
            gridOptions().pagingOptions.totalServerItems(currentFilteredData().length);
        };

        var columnsChanged = ko.observable();

        columnsChanged.subscribe(function (value) {
            gridOptions().columnsChanged = value;
        });

        var vm = {
            createColumnDefinition: createColumnDefinition,
            gridSelectionChange: gridSelectionChange,
            columnDefs: columnDefs,
            setInitialData: setInitialData,
            getOriginalData: getOriginalData,
            getFilteredData: getFilteredData,
            getGridOptions: getGridOptions,
            addRow: addRow,
            updateRow: updateRow,
            deleteRow: deleteRow,
            loadMoreData: loadMoreData,
            loadMoreRecords: loadMoreRecords,
            displaySelectionCheckbox: displaySelectionCheckbox,
            multiSelect: multiSelect,
            groups: groups,
            selectWithCheckboxOnly: selectWithCheckboxOnly,
            columnsChanged: columnsChanged,
            GridCheckBoxes: gridCheckBoxes,
            checkedRows: checkedRows
        };

        return vm;
    };

    var koGridLoadState = function (columnDefs, knockoutGrid) {
        ko.utils.arrayForEach(columnDefs(), function (item) {
            if (item.field === "✔") {
                return;
            }

            if (item.filterType !== 'date') {
                knockoutGrid.columnDefs.push(knockoutGrid.createColumnDefinition(item.field, item.displayName, item.minWidth, item.width, item.filterType, undefined, item.cellTemplate, item.visible));
            } else {
                knockoutGrid.columnDefs.push(knockoutGrid.createColumnDefinition(item.field, item.displayName, item.minWidth, item.width, item.filterType, function (data) { return data ? moment(data).format('DD/MM/YYYY') : 'None' }, item.cellTemplate, item.visible));
            }
        });
    };

    var koGridSaveState = function (localStorageStateName, currentState) {
        window.localStorage.setItem(localStorageStateName, JSON.stringify(ko.toJS(currentState)));
    };

    var koGridGetCurrentState = function (localStorageStateName) {
        return !!(window.localStorage.getItem(localStorageStateName)) ? ko.observableArray(JSON.parse(window.localStorage.getItem(localStorageStateName))) : undefined;
    }

    ko.bindingHandlers.summernote = new function () {
        var isblur = false;

        this.init = function (element, valueAccessor, allBindings) {
            var value = valueAccessor();
            var options = $.extend(value, {
                height: 300,
                toolbar: [
                    ["style", ["bold", "italic", "underline", "clear"]],
                    ["fontstyle", ["style"]],
                    ["color", ["color"]],
                    ["fontsize", ["fontsize"]],
                    ["lists", ["ul", "ol", "paragraph"]],
                    ["insert", ["link"]],
                    ["table", ["table"]],
                    ["misc", ["fullscreen", "codeview"]]
                ],
                onblur: function () {
                    isblur = true;
                    value($(element).code());
                    isblur = false;
                }
            });
            $.extend(options, allBindings.get("summerOptions"));
            return $(element).summernote(options);
        };
        this.update = function (element, valueAccessor) {
            if (!isblur) {
                var value = valueAccessor();
                $(element).code(value());
            }
        };
    };

    var remoteServerName = '';


    var remoteHRAPI = 'HR/api/Procoor';

    var ipAddress = '';

    return {
        profilePath: profilePath,
        routes: routes,
        remoteServerName: remoteServerName,
        language: language,
        JqxGridDataSource: jqxGridDataSource,
        JqxGridColumns: jqxGridColumns,
        GridModel: grid,
        permission: permission,
        postJson: postJson,
        isPageSetup: isPageSetup,
        getAuthenticationHeader: getAuthenticationHeader,
        currentLevel: currentLevel,
        currentProject: currentProject,
        totalNotification: totalNotification,
        lastSelectedProject: lastSelectedProject,
        currentdocApprovalId: currentdocApprovalId,
        currentLanguage: currentLanguage,
        isCompany: isCompany,
        isAllow: isAllow,
        id: id,
        arrange: arrange,
        docType: docType,
        JqxGroups: jqxGroups,
        ExportColumn: exportColumn,
        exportJson: exportJson,
        userPermissions: userPermissions,
        timeSheetSettings: timeSheetSettings,
        selectedPanel: selectedPanel,
        projectName: projectName,
        fromWidgetProject: fromWidgetProject,
        jqxGridColumnGroups: jqxGridColumnGroups,
        pageSize: pageSize,
        KoGridInstanceCreator: koGridInstanceCreator,
        remoteHRAPI: remoteHRAPI,
        ipAddress: ipAddress,
        currentModuleMenu: currentModuleMenu,
        appComponants: appComponants,
        isDocApproval: isDocApproval,
        projectsMenue: projectsMenue,
        chatList: chatList,
        koGridLoadState: koGridLoadState,
        koGridSaveState: koGridSaveState,
        koGridGetCurrentState: koGridGetCurrentState,
        pageExport: pageExport,
        pageTemplate: pageTemplate,
        exportDocumentToPdf: exportDocumentToPdf,
        notificationCount: notificationCount,
        taskCount: taskCount,
        contactName: contactName
    };
});