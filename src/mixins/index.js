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
      let searchPanelHeight = 0;
      if (this.$refs.searchPanel && this.$refs.searchPanel.offsetHeight) {
        searchPanelHeight = this.$refs.searchPanel.offsetHeight;
      }
      let paginationHeight = 0;
      if (this.$refs.pagination && this.$refs.pagination.$el.clientHeight) {
        paginationHeight = this.$refs.pagination.$el.clientHeight;
      }
      let tableHeight =
        documentClientHeight -
        searchPanelHeight -
        this.topOffset -
        paginationHeight;
      window.onresize = () => {
        documentClientHeight = document.documentElement["clientHeight"];
        contentHeight = documentClientHeight - this.topOffset;
        if (this.$refs.searchPanel && this.$refs.searchPanel.offsetHeight) {
          searchPanelHeight = this.$refs.searchPanel.offsetHeight;
        }
        if (this.$refs.pagination && this.$refs.pagination.$el.clientHeight) {
          paginationHeight = this.$refs.pagination.$el.clientHeight;
        }
        tableHeight =
          documentClientHeight -
          searchPanelHeight -
          this.topOffset -
          paginationHeight;
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
      contentHeight: state => state.common.contentHeight,
      tableHeight: state => state.common.tableHeight
    })
  }
};

export default mixins;
