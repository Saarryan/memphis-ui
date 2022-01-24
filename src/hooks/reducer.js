const Reducer = (state, action) => {
  switch (action.type) {
    case "SET_LANGUAGE_CODE":
      return {
        ...state,
        langCode: action.payload,
      };
    case "SET_USER_DATA":
      return {
        ...state,
        userData: action.payload,
      };
    case "SET_ORGANIZATION_DATA":
      return {
        ...state,
        organizationDetails: action.payload,
      };
    case "SET_AUTHENTICATION":
      return {
        ...state,
        isAuthentication: action.payload,
      };
    case "SET_LOADER":
      return {
        ...state,
        loading: action.payload,
      };
    case "IS_USECASE_BUILDER_ACTIVE":
      return {
        ...state,
        isUsecaseBuliderActive: action.payload,
      };
    case "IS_USECASE_EDIT_ACTIVE":
      return {
        ...state,
        isUsecaseEditActive: action.payload,
      };
    case "SET_ROUTE":
      return {
        ...state,
        route: action.payload,
      };
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
      };
    case "SHOW_PANEL":
      return {
        ...state,
        showPanel: action.payload,
      };
    case "UPDATE_IMAGE":
      let org = state.organizationDetails;
      org.profile_pic_url = action.payload;
      return {
        ...state,
        organizationDetails: org,
      };
    case "SET_USECASES_DETAILS":
      return {
        ...state,
        useCaseBuilder: action.payload,
      };
    case "SET_WIZARD_STEP":
      return {
        ...state,
        wizardStep: action.payload,
      };
    case "UPDATE_USECASES_NAME":
      return {
        ...state,
        useCaseBuilder: action.payload,
      };
    case "UPDATE_USECASES_DESCRIPTION":
      return {
        ...state,
        useCaseBuilder: action.payload,
      };
    case "SET_PIPELINE_DETAILS":
      return {
        ...state,
        pipeline: action.payload,
      };
    case "SET_INITIAL_MOCK":
      return {
        ...state,
        initialMock: action.payload,
      };
    case "SET_SCHEMA_CHANGE":
      return {
        ...state,
        schemaChange: action.payload,
      };
    case "UPDATE_MOCK":
      return {
        ...state,
        updatedMock: action.payload,
      };
    case "MOCK_LOADER":
      return {
        ...state,
        mockLoader: action.payload,
      };
    case "INITIAL_PIPELINE_DETAILS":
      let InitialPipeline = {
        created_at: "",
        _id: "",
        name: "",
        usecase_id: "",
        type: "",
        trigger: "",
        trigger_details: {
          end_of_pipeline_details: "",
          schdule_details: {
            cron_schedule: "",
            cron_timezone: "",
            repeat_type: "",
            repeat_value: "",
          },
        },
        status: "",
        last_updated: "",
        schema_builder: [],
        logic_stages: [],
        data_source: {},
        data_destination: {},
      };
      return {
        ...state,
        pipeline: InitialPipeline,
      };
    case "INITIAL_DATA_SOURCE":
      let initialDataSource = state.pipeline;
      initialDataSource.data_source = {};
      return {
        ...state,
        pipeline: initialDataSource,
      };
    case "INITIAL_DATA_DESTINATION":
      let initialDataDestination = state.pipeline;
      initialDataDestination.data_destination = {};
      return {
        ...state,
        pipeline: initialDataDestination,
      };
    case "INITIAL_PIPELINE_SCHEMA_BUILDER":
      let initialPiplineSchemaBuilder = state.pipeline;
      initialPiplineSchemaBuilder.schema_builder.length = 0;
      initialPiplineSchemaBuilder.schema_builder = [];
      return {
        ...state,
        pipeline: initialPiplineSchemaBuilder,
      };
    case "RESET_USECASE":
      let useCaseBuilder = [
        {
          description: "",
          organization_published: false,
          marketplace_published: false,
          enabled: false,
          created_at: "",
          pipeline_ids: [""],
          _id: "",
          name: "",
          user_id: "",
          organization_id: "",
          last_updated: "",
        },
      ];
      let pipeline = {
        created_at: "",
        _id: "",
        name: "",
        usecase_id: "",
        type: "",
        trigger: "",
        trigger_details: {
          end_of_pipeline_details: {},
          schdule_details: {},
        },
        status: "",
        last_updated: "",
        schema_builder: [],
        logic_stages: [],
        data_source: {},
        data_destination: {},
      };
      return {
        ...state,
        useCaseBuilder: useCaseBuilder,
        pipeline: pipeline,
      };
    case "FLIP_MOCK":
      return {
        ...state,
        isOpenMock: action.payload,
      };
    case "FLIP_FUNCTIONS":
      return {
        ...state,
        isOpenFunctions: action.payload,
      };
    case "DATE_SAMPLE_STEP":
      return {
        ...state,
        uploadDataSample: action.payload,
      };
    case "CHECK_SOURCE":
      return {
        ...state,
        checkedSourced: action.payload,
      };
    default:
      return state;
  }
};

export default Reducer;
