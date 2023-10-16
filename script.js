let dateNodeList = document.getElementsByClassName('task-details');
for (let index = 0; index < dateNodeList.length; index++) {
	let divBlock = document.createElement('div');
	let textNode = document.createTextNode('\u00D7');
	divBlock.className = 'close';
	divBlock.appendChild(textNode);
	dateNodeList[index].appendChild(divBlock);
}
let list = document.getElementById('tasks-list');
list.addEventListener('click', function(ev) {
	if (ev.target.classList.contains('task-list-item')) {
		ev.target.classList.toggle('checked');
	} else if (ev.target.closest('.task-list-item')) {
		ev.target.closest('.task-list-item').classList.toggle('checked');
	}
}, false);
document.getElementById('current-year').innerHTML = new Date().getFullYear();
// Close the element when pressed
let close = document.getElementsByClassName("close");
for (let index = 0; index < close.length; index++) {
	close[index].onclick = function() {
		var element = this.parentElement;
		element.style.display = "none";
	}
}
function sparseDate(date) {
	let dateList = date.split('-');
	date = dateList[2] + '-' + dateList[1] + '-' + dateList[0];
	return date;
}
function checkValidity(date) {
	if (typeof(date) === 'string') return true;
	let days = parseInt((date - new Date()) / (1000 * 60 * 60 * 24), 10);
	if (days >= 0) {
		return true;
	};
	return false;
}
function addItem() {
	let currentDate = new Date();
	let currentDateValue = currentDate.toISOString().split('T')[0];
	currentDateValue = sparseDate(currentDateValue);
	// Get Task Details
	let inputValue = document.getElementById('task-name-input').value;
	let deadlineValue = document.getElementById('task-deadline-input').value;
	// Create all nodes
	let taskNameContainer = document.createElement('div');
	let dateContainer = document.createElement('div');
	let detailContainer = document.createElement('div');
	let detailListItem = document.createElement('div');
	let inputValueNode = document.createTextNode(inputValue);
	// Add Classes
	taskNameContainer.classList.add('task-detail-name');
	dateContainer.classList.add('task-detail-deadline');
	detailContainer.classList.add('task-details');
	detailListItem.classList.add('task-list-item');
	// Create Date
	let deadlineDate = '', sparsedDeadlineDate = '';
	if (deadlineValue !== '') {
		deadlineDate = new Date(deadlineValue);
		sparsedDeadlineDate = sparseDate(deadlineDate.toISOString().split('T')[0]);
	} else dateContainer.classList.add('empty-deadline');
	let deadlineValueNode = document.createTextNode(sparsedDeadlineDate);
	// Append Children
	taskNameContainer.appendChild(inputValueNode);
	dateContainer.appendChild(deadlineValueNode);
	detailContainer.appendChild(taskNameContainer);
	detailContainer.appendChild(dateContainer);
	let deadlineValid = checkValidity(deadlineDate);
	if (inputValue === '') {
		alert('Please enter your task!');
	} else if (deadlineValid === false) {
		alert('Please enter valid date!');
	} else {
		detailListItem.appendChild(detailContainer);
	}
	document.getElementById('tasks-list').appendChild(detailListItem);
	document.getElementById('task-name-input').value = '';
	document.getElementById('task-deadline-input').value = '';
	// Add Close Button
	let divBlock = document.createElement('div');
	let textNode = document.createTextNode('\u00D7');
	divBlock.className = 'close';
	divBlock.appendChild(textNode);
	detailContainer.appendChild(divBlock);
	// Change width of before element
	currentDate = new Date();
	let startDate = new Date(Date.now() - 10 * 24 * 60 * 60 * 1000);
	let totalDays = parseInt((deadlineDate - startDate) / (1000 * 60 * 60 * 24), 10);
	let daysLeft = parseInt((deadlineDate - currentDate) / (1000 * 60 * 60 * 24), 10);
	let beforeWidth = (100 - ((totalDays - daysLeft + 1) * 100 / totalDays)).toString() + '%';
	detailListItem.style.setProperty('--width-before', beforeWidth);
	// Close the element when pressed
	let close = document.getElementsByClassName("close");
	for (let index = 0; index < close.length; index++) {
		close[index].onclick = function() {
			var element = this.parentElement;
			element.style.display = "none";
		}
	}
}