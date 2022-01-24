export const ApiEndpoint = {
    // Auth
    EMAIL_VERFICATION: '/management/auth/emailVerification',
    FIRST_SIGN_IN: '/management/auth/firstSignin',
    SIGN_IN: '/management/auth/signin',
    RESET_PASSWORD: '/management/auth/resetPassword',
    REFRESH_TOCKEN: '/management/auth/refreshToken',
    LOGOUT: '/management/auth/logout',
    REQUEST_SMS_CODE: '/management/auth/sendSMSCode',
    VERFICATION_SMS_CODE: '/management/auth/verifySMSCode',
    EMAIL_VERFICATION_FOR_TOKEN: '/management/auth/emailVerificatioForToken',
    RECOVER_PASSWORD: '/management/auth/recoverPassword',



    //Organization
    GET_ORGANIZATION_DETAILS: '/management/organizations',
    CHANGE_LOGO: '/management/organizations/changeLogo',
    REMOVE_ORGANIZATION: '/management/organizations/removeAccount',

    //User
    GET_ALL_USERS: '/management/users',
    GET_USER_BY_ID: '/management/users',
    REMOVE_USER: '/management/users/remove',
    CREATE_USER: '/management/users/register',
    CHANGE_USER_ROLE: '/management/users/changeRole',
    CHANGE_USER_GROUP: '/management/users/changeGroup',
    CREATE_USECASE_FLAG: '/management/users/setCreateUsecaseFlag',
    SAW_SCHEMA_FLAG: '/management/users/setSawSchemaPageFlag',
    WANT_TO_HEAR_NEW_FEATURE_FLAG: '/management/users/setWantToHearNewFeatureFlag',

    //Group
    Get_ALL_GROUP: '/management/groups/getGroupsByOrganization',
    CREATE_NEW_GROUP: '/management/groups/createGroup',
    REMOVE_GROUP: '/management/groups/removeGroup',
    CHANGE_GROUP_NAME: '/management/groups/changeGroupName',

    //Roles
    Get_ALL_ROLES: '/management/roles/getRoles',


    //Usecases
    GET_ORGANIZATION_USECASES: '/usecases/getOrganizationalUsecases',
    GET_USER_USECASES: '/usecases/getUserUsecases',
    GET_USER_USECASE_BY_ID: '/usecases/getUsecaseById',
    REMOVE_USECASE: '/usecases/remove',
    CREATE_USECASE: '/usecases/createUsecase',
    CHANGE_USECASE_NAME: '/usecases/changeName',
    CHANGE_USECASE_DESCRIPTION: '/usecases/changeDescription',
    PUBLISH_TO_ORGANIZATION: '/usecases/publishToOrganization',
    PUBLISH_TO_MARKETPLACE: '/usecases/publishToMarketplace',
    ENABLE_USECASE: '/usecases/enable',
    DISABLE_USECASE: '/usecases/disable',

    //Piplines
    GET_PIPELINE_TYPES: '/usecases/pipelines/getPipelineTypes',
    GET_STREAM_DATA_TYPES: '/usecases/pipelines/getSupportedPipelineStreamDataTypes',
    GET_PIPELINE_TRIGGERS: '/usecases/pipelines/getPipelineTriggers',
    CREATE_PIPELINE: '/usecases/pipelines/createPipeline',
    GET_DATA_SOURCE_TYPES: '/usecases/pipelines/getDataSourceTypes',
    Get_DATA_SOURCE_SUB_TYPES: '/usecases/pipelines/getDataSourceSubTypes',
    EDIT_PIPELINE: '/usecases/pipelines/editPipeline',
    GET_MOCK: '/usecases/pipelines/getMock',
    GET_UPDATED_MOCK: '/usecases/pipelines/getUpdatedMock',
    GET_DATA_SOURCE_FIELDS: '/usecases/pipelines/getDataSourceFields',
    GET_USECASE_PIPELINES: '/usecases/pipelines/getUsecasePipelines',
    EDIT_DATA_SOURCE: '/usecases/pipelines/editDataSource',
    TEST_CONNECTION: '/usecases/pipelines/testConnection',
    ADD_MAP_TO_PIPELINE_SCHEMA: '/usecases/pipelines/addMapToPipelineSchema',
    UPLOAD_FILE: '/usecases/pipelines/editDataSourceWithFile',
    REMOVE_DATA_SOURCE: '/usecases/pipelines/removeDataSource',
    GET_DATA_DESTINATION_TYPES: '/usecases/pipelines/getDataDestinationTypes',
    Get_DATA_DESTINATION_SUB_TYPES: '/usecases/pipelines/getDataDestinationSubTypes',
    EDIT_DATA_DESTINATION: '/usecases/pipelines/editDataDestination',
    REMOVE_PIPELINE: '/usecases/pipelines/remove',
    RUN_PIPELINE: '/usecases/pipelines/run',
    ENABLE_PIPELINE: '/usecases/pipelines/enable',
    DISABLE_PIPELINE: '/usecases/pipelines/disable',
    TERMINATE_PIPELINE: '/usecases/pipelines/terminate',
    ADD_LOGIC_STAGES: '/usecases/pipelines/addLogicStage',
    EDIT_LOGIC_STAGES: '/usecases/pipelines/editLogicStage',
    REMOVE_SCHEMA: '/usecases/pipelines/removePipelineSchema',
    COPY_ORIGIN_SCHEMA: '/usecases/pipelines/copyOriginSchema',
    REMOVE_LOGIC_FUNCTION: '/usecases/pipelines/removeLogicStage',
    GET_SCHEMA_WITH_FUNCTION: '/usecases/pipelines/getSchemaWithFunctionsOutput',
    GET_LOGIC_FUNCTION: '/usecases/pipelines/getLogicFunctions',
    GET_LOGIC_FUNCTION_DETAILS: '/usecases/pipelines/getLogicFunctionDetails',
    GET_LOGIC_FUNCTION_TYPE: '/usecases/pipelines/getLogicFunctionTypes',
    DUPLICATE_PIPELINE: '/usecases/pipelines/duplicatePipeline',
    GET_SOURCE_SCHEMA: '/usecases/pipelines/getSourceSchema',
    GET_DESTINATION_SCHEMA: '/usecases/pipelines/getDestinationSchema',
    ADD_DESTINATION_FIELD_TO_PIPELINE_SCHEMA: '/usecases/pipelines/addDestinationFieldToPipelineSchema',
    REMOVE_MAP_FROM_PIPELINE_SCHEMA: '/usecases/pipelines/removeMapFromPipelineSchema',
    CHANGE_DESTINATION_FIELD_TYPE: '/usecases/pipelines/changeDestinationFieldNameAndType',
    GET_STREAM_URL: '/usecases/pipelines/getStreamUrl',
    EDIT_PIPELINE_STREAM_DATA: '/usecases/pipelines/editPipelineStreamDetails',
    ADD_MOCK_SAMPLE: '/usecases/pipelines/addMockSample',
    ADD_CUSTOM_FUNCTION: '/usecases/pipelines/addCustomFunction',
    REMOVE_CUSTOM_FUNCTION: '/usecases/pipelines/removeCustomFunction',

    //Api keys
    GET_USER_KEYS: '/management/apiKeys/getUserKeys',
    GENERATE_KEY: '/management/apiKeys/generateApiKey',
    REMOVE_KEY: '/management/apiKeys/removeKey',

    GET_DESTINATION_FIELDS: '/usecases/pipelines/getDestinationFields',
    POPULATE_DESTINATION_FIELD_IN_SCHEMA: '/usecases/pipelines/populateDestinationFieldInSchema',

    //Plans
    GET_PLANS: '/management/plans/getActivePlans',

    //Billing
    GET_IFRAME: '/management/billing/getIframeUrl',
    GET_ORGANIZATION_OBJECT_BALANCE: '/management/billing/getOrganizationalObjectBalance',
    GET_ORGANIZATION_TRANSACTIONS_AUDIT: '/management/billing/getOrganizationalTransactionsAudit',
    GET_ORGANIZATION_OBJECT_USAGE: '/management/billing/getOrganizationalObjectsUsageAudit',

    //Statistics
    GET_ORGANIZATION_TOTAL_USAGE: '/usecases/statistics/getOrganizationTotalUsage',
    GET_ORGANIZATION_PROCESSED_RECORDS: '/usecases/statistics/getOrganizationProcessedRecordsPerMonths',
    GET_ORGANIZATION_DATASOURCES_USAGE: '/usecases/statistics/getOrganizationDataSourcesUsage',
    GET_ORGANIZATION_EXECUTION: '/usecases/statistics/getOrganizationExecutions',
    GET_ORGANIZATION_SCHEDULED_PIPELINES: '/usecases/statistics/getOrganizationScheduledPipelines',

    //Alerts
    GET_USER_ALERTS_PREFRENCES: '/management/alerts/getUserAlertsPrefrences',
    UPDATE_USER_ALERTS_PREFRENCES: '/management/alerts/updateUserAlertsPrefrences'
}

