import { mapMutations, mapState } from "vuex";
const mixins = {
  data() {
    return {
      topOffset: 180
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
    tableScollToTop() {
      if (this.$refs.searchTable) {
        this.$refs.searchTable.bodyWrapper.scrollTop = 0;
      }
    },
    resetDocumentClientHeight() {
      let documentClientHeight = document.documentElement["clientHeight"];
      let contentHeight = documentClientHeight - this.topOffset;
      let searchPanelHeight = 0;
      if (this.$refs.searchPanel && this.$refs.searchPanel.offsetHeight) {
        searchPanelHeight = this.$refs.searchPanel.offsetHeight;
      }
      let tableHeight =
        documentClientHeight - searchPanelHeight - this.topOffset;
      window.onresize = () => {
        documentClientHeight = document.documentElement["clientHeight"];
        contentHeight = documentClientHeight - this.topOffset;
        if (this.$refs.searchPanel && this.$refs.searchPanel.offsetHeight) {
          searchPanelHeight = this.$refs.searchPanel.offsetHeight;
        }
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
      contentHeight: state => state.common.contentHeight,
      tableHeight: state => state.common.tableHeight
    }),
    contentStyle() {
      let vm = this;
      let style = {
        height: vm.contentHeight + "px"
      };
      return style;
    }
  }
};

export default mixins;
