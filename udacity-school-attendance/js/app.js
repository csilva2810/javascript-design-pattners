/* STUDENTS IGNORE THIS FUNCTION
 * All this does is create an initial
 * attendance record if one is not found
 * within localStorage.
 */
(function() {
    if (!localStorage.attendance) {
        console.log('Creating attendance records...');
        function getRandom() {
            return (Math.random() >= 0.5);
        }

        var nameColumns = $('tbody .name-col'),
            attendance = {};

        nameColumns.each(function() {
            var name = this.innerText;
            attendance[name] = [];

            for (var i = 0; i <= 11; i++) {
                attendance[name].push(getRandom());
            }
        });

        localStorage.attendance = JSON.stringify(attendance);
    }
}());

document.addEventListener('DOMContentLoaded', function () {

  var model = {

    students: [
      { 
        name: "Slappy the Frog",
        attendance: [true, false, false, true, false, false, true, true, true, false, false, true],
        missed: 6
      },
      { 
        name: "Lilly the Lizard", 
        attendance: [false, false, false, false, true, false, true, false, false, false, false, false], missed: 10 
      }, 
      { 
        name: "Paulrus the Walrus", 
        attendance: [true, true, true, true, false, true, false, false, true, false, false, true],
        missed: 5 
      }, 
      { 
        name: "Gregory the Goat", 
        attendance: [true, true, true, true, true, true, true, false, false, true, true, true] ,
        missed: 2
      },
      { 
        name: "Adam the Anaconda",
        attendance: [true, true, false, false, false, true, true, true, true, false, false, false] ,
        missed: 6
      }
    ]

  }

  var octopus = {
    init: function () {
      studentsListView.init();
    },

    getStudents: function () {
      return model.students;
    },

    updateStudent: function (student, attendance, index) {
      // console.log('update', student.name, attendance, index);
      var i = this.getStudents().findIndex(function (s) {
        return s.name === student.name;
      });
      model.students[i].attendance[index] = attendance;
      studentsListView.render();
    }
  }

  var studentsListView = {

    init: function () {
      this.view = document.querySelector('.students-list');
      this.render();
    },

    renderStudentRow: function (student) {
      
      var missed = 0;
      var studentRow = document.createElement('tr');
      var nameCol = document.createElement('td');
      var missedCol = document.createElement('td');

      nameCol.classList.add('name-col');
      nameCol.textContent = student.name;
      studentRow.appendChild(nameCol);

      student.attendance.forEach(function (attendance, index) {
        var col = document.createElement('td');
        var checkbox = document.createElement('input');

        checkbox.type = 'checkbox';
        checkbox.checked = attendance;
        checkbox.addEventListener('click', (function (stud, attend, i) {
          return function () {
            octopus.updateStudent(stud, !attend, i);
          }
        })(student, attendance, index));

        if (!attendance) {
          missed++;
        }

        col.appendChild(checkbox);
        studentRow.appendChild(col);
      });

      missedCol.textContent = missed;
      missedCol.classList.add('missed-col');
      studentRow.appendChild(missedCol);

      return studentRow;

    },

    render: function () {
      
      this.view.innerHTML = '';
      octopus.getStudents().forEach(function (student, rowIndex) {
        
        var studentRow = this.renderStudentRow(student, rowIndex);

        this.view.appendChild(studentRow);

      }.bind(this));

    }

  }

  octopus.init();

});