/*jshint esversion: 6 */
$(document).ready(function () {
  const gpaRegular = {
    "A+": "4.3", "A": "4.0", "A-": "3.7", "B+": "3.3", "B": "3.0", "B-": "2.7",
    "C+": "2.3", "C": "2.0", "C-": "1.7", "D+": "1.3", "D": "1.0", "D-": "0.7", "F": "0.0"
  };
  const gpaHonors = {
    "A+": "4.8", "A": "4.5", "A-": "4.2", "B+": "3.8", "B": "3.5", "B-": "3.2",
    "C+": "2.8", "C": "2.5", "C-": "2.2", "D+": "1.8", "D": "1.5", "D-": "1.2", "F": "0.0"
  };
  const gpaAp = {
    "A+": "5.3", "A": "5.0", "A-": "4.7", "B+": "4.3", "B": "4.0", "B-": "3.7",
    "C+": "3.3", "C": "3.0", "C-": "2.7", "D+": "2.3", "D": "2.0", "D-": "1.7", "F": "0.0"
  };

  const halfYear = ["Business Law", "Computer Applications", "Entrepreneurship", "Fashion Marketing", "Financial Literacy",
    "International Business", "Sports & Entertainment Management", "Computer Science", "Java Honors", "Advanced Java Honors",
    "Web Design", "Creative Writing I", "Creative Writing II Honors", "Film Study", "Forensics I", "Forensics II",
    "Parcc English", "Ceramics I", "Ceramics II", "Ceramics III", "Crafts I", "Crafts II", "Photography", "Advanced Photography",
    "Culinary Arts I", "Foods Around the World", "Culinary Arts II", "Child Development I", "Child Development II",
    "Child Development III", "Interior Design I", "Interior Design II", "Introduction to Technology", "Technology II",
    "Strategic Design", "Video and Broadcast Production I", "Video and Broadcast Production II", "Broadway Workshop",
    "Math Lab", "Parcc Mathematics", "Economics", "Economics Honors", "Psychology", "Advanced Psychology", "Sociology"];

  const labs = ["Biology", "Biology Enriched", "Biology Honors", "Ap Biology", "Principles in Anatomy", "Anatomy & Physiology",
    "Research in Molecular Biology", "Chemistry", "Chemistry Enriched", "Chemistry Honors", "AP Chemistry", "Physics Enriched",
    "Physics Honors", "AP Physics C: Mechanics", "AP Physics C: Electricity & Magnetism", "AP Environmental Science",
    "Science Research Program I", "Science Research Program II", "Science Research Program III"];

  const semester = ["Forensic Science", "Robotics Engineering"];

  // Get all the data inside the gradebook table
  const grades_and_classes = $("table[class='list']")[0].rows;

  let grades = [];
  let courses = [];
  let credits = [];
  let gpas = [];
  let total_credits = 0;
  let qualityPoints = 0;

  // A valid course must not be a non gpa class i.e gym, and have a valid grade
  const ifValid = (name, grade) => {
    return (
      name.indexOf("Physical Ed") == -1 &&
      name.indexOf("Health") == -1 &&
      grade.indexOf("No Grades") == -1 &&
      grade.indexOf("Not Graded") == -1 &&
      grade.length > 0
    );
  };

  // Filter out through all courses for those that are valid
  for (let i = 1; i < grades_and_classes.length; i++) {
    let name = grades_and_classes[i].cells[0].innerText;
    let grade = grades_and_classes[i].cells[2].innerText.replace(/[^A-F+-]/g, '');
    if (ifValid(name, grade)) {
      courses.push(name);
      grades.push(grade);
    }
  }

  // Filter classes by credits
  for (let i = 0; i < courses.length; i += 1) {
    if (halfYear.indexOf(courses[i]) > -1) {
      credits.push("2.5");
      total_credits += 2.5;
      console.log(courses[i]);
    }
    else if (labs.indexOf(courses[i]) > -1) {
      credits.push("6");
      total_credits += 6;
      console.log(courses[i]);
    }
    else if (semester.indexOf(courses[i]) > -1) {
      credits.push("3");
      total_credits += 3;
      console.log(courses[i]);

    }
    else {
      credits.push("5");
      total_credits += 5;
      console.log(courses[i]);
    }
  }

  for (let i = 0; i < courses.length; i += 1) {
    if (courses[i].indexOf("AP") > -1) {
      gpas.push(gpaAp[grades[i]]);
    }
    else if (courses[i].indexOf("Honors") > -1) {
      gpas.push(gpaHonors[grades[i]]);
    }
    else {
      gpas.push(gpaRegular[grades[i]]);
    }
  }

  for (let i = 0; i < courses.length; i += 1) {
    qualityPoints += gpas[i] * credits[i];
  }

  let gpa = qualityPoints / total_credits;

  // $("p[style='text-align: center']").remove();
  $("#gpa").remove();
  let loading = '<div id="loading" class="loader">Loading...</div>';
  $('p[class="sectionTitle"]').append($(loading));

  let html = '<h1 id="gpa" style="color:#ffffff;background-color:#019BC6;height:10px;text-align:center;line-height:100px;width:50px;border-radius:25px;margin:0 auto;margin-top:10px;  box-shadow: 2px 2px 4px rgba(0, 0, 0, .4);"> GPA: ';
  html += gpa.toFixed(2);
  html += "</h1>";
  setTimeout(function () {
    $("#loading").remove();
    $('p[class="sectionTitle"]').append($(html));
    gpaDiv = $("#gpa");
    gpaDiv.animate({ height: '100px', opacity: '0.6' }, "slow");
    gpaDiv.animate({ width: '250px', opacity: '1' }, "fast");
  }, 1500);
});
