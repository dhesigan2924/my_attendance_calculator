function calculate_attendance_percentage(total_days, days_absent) {
  let attendance_percentage = ((total_days - days_absent) / total_days) * 100;
  return attendance_percentage.toFixed(2);
}

function percent(total_days, days_absent) {
  let target1 = 75;
  let target2 = 80;
  let remaining_days = 0;
  let td = total_days;
  let k = 0;
  let messages = [];

  let p = calculate_attendance_percentage(total_days, days_absent);
  if (p >= target2) {
    messages.push(
      `<b>Congratulations!<br> You've already achieved ${target2}% attendance.</b>`
    );
  } else if (p >= target1) {
    messages.push(
      `<b>Congratulations! <br>You've already achieved ${target1}% attendance.</b>`
    );
    while (k <= 99) {
      k = ((td - days_absent) / td) * 100;
      if (k >= target2) {
        remaining_days = td;
        break;
      }
      td += 1;
    }
    remaining_days -= total_days;
    messages.push(
      `<b>To achieve more than ${target2} % attendance, you need to attend ${Math.floor(
        remaining_days
      )} more days.</b>`
    );
  } else {
    while (k <= 99) {
      k = ((td - days_absent) / td) * 100;
      if (k > target1 && k <= target2) {
        remaining_days = td;
        break;
      }
      td += 1;
    }
    remaining_days -= total_days;
    messages.push(
      `<b>To achieve more than ${target1}% attendance, you need to attend ${Math.floor(
        remaining_days
      )} more days.</b>`
    );
  }

  messages.push(...excess_absence(total_days, days_absent));
  return messages;
}

function excess_absence(total_days, days_absent) {
  let target = 80;
  let days = days_absent;
  let leave_days_count = 0;
  let messages = [];
  while (true) {
    let k = ((total_days - days) / total_days) * 100;
    if (k <= target) {
      break;
    }
    days += 1;
    total_days += 1;
  }
  leave_days_count = days - days_absent;
  if (leave_days_count > 0) {
    messages.push(
      `<b>You can take leave for ${Math.floor(
        days - days_absent
      )} more days without falling below 80% attendance.</b>`
    );
  } else {
    messages.push(
      `<h4></b>You don't have proper attendance.
      So don't take leave to improve your attendance.</b></h4>`
    );
  }
  return messages;
}

function calculate() {
  let total_days = parseFloat(document.getElementById("total_days").value);
  let days_absent = parseFloat(document.getElementById("days_absent").value);
  let resultDiv = document.getElementById("result");
  let messages = [];
  if (isNaN(total_days)) {
    messages.push(`<h2> INVALID ENTRY !</h2>`);
  } else if (total_days <= 0) {
    messages.push(`<h3>Invalid! number of Total Days.</h3> `);
  } else if (
    days_absent < 0 ||
    days_absent > total_days ||
    isNaN(days_absent)
  ) {
    messages.push("<h3>Invalid! number of days absent.</h3>");
  } else {
    let attendance_percentage = calculate_attendance_percentage(
      total_days,
      days_absent
    );
    messages.push(
      `<h5>Your attendance percentage is: ${attendance_percentage}</h5>%`
    );
    messages.push(...percent(total_days, days_absent));
  }
  resultDiv.innerHTML = messages.join("<br>");
}

function calculate_attendance_percentage(total_days, days_absent) {
  let attendance_percentage = ((total_days - days_absent) / total_days) * 100;
  return attendance_percentage.toFixed(2);
}

function calculate() {
  let total_days = parseFloat(document.getElementById("total_days").value);
  let days_absent = parseFloat(document.getElementById("days_absent").value);
  let resultDiv = document.getElementById("result");
  let messages = [];
  if (total_days <= 0 || isNaN(total_days)) {
    alert("Total days should be greater than zero.");
    return;
  } else if (
    days_absent < 0 ||
    days_absent > total_days ||
    isNaN(days_absent)
  ) {
    alert("Invalid number of days absent.");
    return;
  } else {
    let attendance_percentage = calculate_attendance_percentage(
      total_days,
      days_absent
    );
    messages.push(
      `<b>Your attendance percentage is: ${attendance_percentage}% </b>`
    );
    messages.push(...percent(total_days, days_absent));
  }
  // Display result in modal
  showModal(messages.join("<br>"));
}

function closeModal() {
  let modal = document.getElementById("resultModal");
  modal.style.display = "none";
}

function showModal(message) {
  let modal = document.getElementById("resultModal");
  let resultDiv = document.getElementById("result");
  // Split the message by line break and add a <br> tag after each message
  let formattedMessage = message.split("<br>").join("<br><br>");
  resultDiv.innerHTML = formattedMessage;
  modal.style.display = "block";
}
