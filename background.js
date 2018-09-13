var currentTheme = "";

const BASETHEME = {
  images: {
    theme_frame: "background.png"
  }
};

const colors = {
  disco: "#9C186C",
  amber: "#FDC300",
  rioGrande: "#B4CA00",
  chambray: "#313C87"
};

/**
 * Theme color scheme:
 * accentcolor: A,
 * popup: A,
 * textcolor: B,
 * tab_text: B,
 * tab_line: B,
 * toolbar_bottom_separator: B,
 * popup_text: B,
 * popup_highlight: B,
 * popup_highlight_text: A
 */
const themes = {
  morning: Object.assign({}, BASETHEME, {
    colors: {
      accentcolor: colors.amber,
      popup: colors.amber,
      textcolor: colors.disco,
      tab_text: colors.disco,
      tab_line: colors.disco,
      toolbar_bottom_separator: colors.disco,
      popup_text: colors.disco,
      popup_highlight: colors.disco,
      popup_highlight_text: colors.amber
    }
  }),
  afternoon: Object.assign({}, BASETHEME, {
    colors: {
      accentcolor: colors.rioGrande,
      popup: colors.rioGrande,
      textcolor: colors.chambray,
      tab_text: colors.chambray,
      tab_line: colors.chambray,
      toolbar_bottom_separator: colors.chambray,
      popup_text: colors.chambray,
      popup_highlight: colors.chambray,
      popup_highlight_text: colors.rioGrande
    }
  }),
  evening: Object.assign({}, BASETHEME, {
    colors: {
      accentcolor: colors.disco,
      popup: colors.disco,
      textcolor: colors.amber,
      tab_text: colors.amber,
      tab_line: colors.amber,
      toolbar_bottom_separator: colors.amber,
      popup_text: colors.amber,
      popup_highlight: colors.amber,
      popup_highlight_text: colors.disco
    }
  }),
  night: Object.assign({}, BASETHEME, {
    colors: {
      accentcolor: colors.chambray,
      popup: colors.chambray,
      textcolor: colors.rioGrande,
      tab_text: colors.rioGrande,
      tab_line: colors.rioGrande,
      toolbar_bottom_separator: colors.rioGrande,
      popup_text: colors.rioGrande,
      popup_highlight: colors.rioGrande,
      popup_highlight_text: colors.chambray
    }
  })
};

function setTheme(theme) {
  if (currentTheme === theme) {
    // No point in changing the theme if it has already been set.
    return;
  }
  currentTheme = theme;
  browser.theme.update(themes[theme]);
}

function checkTime() {
  let date = new Date();
  let hours = date.getHours();
  
  if (hours >= 9 && hours <= 4) {
    setTheme("night");
  } else if (hours >= 5 && hours < 12) {
    setTheme("morning");
  } else if (hours >= 12 && hours < 5) {
    setTheme("afternoon");
  } else {
    setTheme("evening");
  }
}

// On start up, check the time to see what theme to show.
checkTime();

// Set up an alarm to check this regularly.
browser.alarms.onAlarm.addListener(checkTime);
browser.alarms.create("checkTime", { periodInMinutes: 5 });
