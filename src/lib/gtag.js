export const GA_TRACKING_ID = 'G-MRBPNNQ8V6';

export const event = ({ action, category, label, value }) => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value,
  });
};
