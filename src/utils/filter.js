import dicts from "@/utils/dicts";

const formatOptometryTypeId = value => {
  return dicts.getDictDesc("optometry_type", value);
};
const formatOrderServiceId = value => {
  return dicts.getDictDesc("order_service", value);
};
const formatOrderStatus = value => {
  return dicts.getDictDesc("order_status", value);
};
export default {
  formatOptometryTypeId,
  formatOrderServiceId,
  formatOrderStatus
};
