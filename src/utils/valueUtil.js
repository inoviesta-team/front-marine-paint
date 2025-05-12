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
  
  formatDistanceToNow: (iso) => {
    const date = new Date(iso);
    const now = new Date();
    const diff = now.getTime() - date.getTime();

    const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
    const months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor(diff / (1000 * 60));
    const seconds = Math.floor(diff / 1000);

    if (years > 0) {
      return `${years} tahun lalu`;
    } else if (months > 0) {
      return `${months} bulan lalu`;
    } else if (days > 0) {
      return `${days} hari lalu`;
    } else if (hours > 0) {
      return `${hours} jam lalu`;
    } else if (minutes > 0) {
      return `${minutes} menit lalu`;
    } else {
      return `${seconds} detik lalu`;
    }
  },
};
