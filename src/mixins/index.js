import { mapMutations, mapState } from "vuex";
const mixins = {
  data() {
    return {
      topOffset: 136
    };
  },
  created() {},
  mounted() {
    this.$nextTick(() => {
      this.resetDocumentClientHeight();
    });
  },
  activated() {},
  methods: {
    resetDocumentClientHeight() {
      let documentClientHeight = document.documentElement["clientHeight"];
      let contentHeight = documentClientHeight - this.topOffset;
      let searchPanelHeight = this.$refs.searchPanel.offsetHeight || 0;
      let tableHeight = documentClientHeight - searchPanelHeight - this.topOffset;
      window.onresize = () => {
        documentClientHeight = document.documentElement["clientHeight"];
        contentHeight = documentClientHeight - this.topOffset;
        searchPanelHeight = this.$refs.searchPanel.offsetHeight || 0;
        tableHeight = documentClientHeight - searchPanelHeight - this.topOffset;
        this.updateClientHeight(documentClientHeight);
        this.updateContentHeight(contentHeight);
        this.updateTableHeight(tableHeight);
      };
      this.updateClientHeight(documentClientHeight);
      this.updateContentHeight(contentHeight);
      this.updateTableHeight(tableHeight);
    },
    ...mapMutations({
      updateClientHeight: "UPDATE_DOCUMENT_HEIGHT",
      updateContentHeight: "UPDATE_CONTENT_HEIGHT",
      updateTableHeight: "UPDATE_TABLE_HEIGHT"
    })
  },
  computed: {
    ...mapState({
      documentClientHeight: state => state.common.documentClientHeight,
      tableHeight: state => state.common.tableHeight
    })
  }
};

export default mixins;
