export const valueUtil = {
  formatPriceRupiah: (price) => {
    return new Intl.NumberFormat("id-ID").format(price);
  },

  formatDate: (iso) => {
    return new Date(iso).toLocaleString("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  },

  formatDateWithTime: (iso) => {
    return new Date(iso).toLocaleString("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  },
};
