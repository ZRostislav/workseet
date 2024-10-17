import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";

function getDaysInMonth(year: number, month: number) {
  const date = new Date(year, month, 1);
  const days: { dayName: string; date: number }[] = [];

  while (date.getMonth() === month) {
    const dayName = date.toLocaleDateString("ru-RU", { weekday: "short" });
    days.push({ dayName, date: date.getDate() });
    date.setDate(date.getDate() + 1);
  }

  return days;
}

function App() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();

  const daysInMonth = getDaysInMonth(year, month);
  const monthName = now.toLocaleDateString("ru-RU", { month: "long" });

  const initialEntries = daysInMonth.map(() => ({ teacher: 0, assistant: 0 }));

  const [entries, setEntries] = useState(initialEntries);
  const [dateInput, setDateInput] = useState("");
  const [teacherInput, setTeacherInput] = useState(0);
  const [assistantInput, setAssistantInput] = useState(0);

  const handleAddEntries = () => {
    const date = new Date(dateInput);
    const day = date.getDate();

    if (day > 0 && day <= daysInMonth.length) {
      const newEntries = [...entries];
      // Перезаписываем часы вместо добавления
      newEntries[day - 1].teacher = teacherInput;
      newEntries[day - 1].assistant = assistantInput;
      setEntries(newEntries);
      setDateInput("");
      setTeacherInput(0);
      setAssistantInput(0);
    } else {
      alert("Пожалуйста, введите правильную дату.");
    }
  };

  // Суммируем значения
  const totalHours = entries.reduce(
    (sum, entry) => sum + entry.teacher + entry.assistant,
    0
  );
  const salary = totalHours * 50;

  return (
    <>
      <div className="container d-flex flex-column justify-content-center align-items-center">
        <header className="header">
          <div className="header-h1">
            <h1 className="haeder-h1__text text-center mt-4 fw-bold">
              WorkSeet
            </h1>
          </div>
        </header>

        <main className="main mt-4 d-block">
          <div className="main-authorization d-none">
            <div className="main-authorization__messageLogin">
              <p className="text-center">Welcome!</p>
            </div>
            <div className="main-authorization__register p-4 rounded ">
              <div className="main-register__content">
                <div className="main-register__text text-center">
                  <p>login</p>
                </div>
                <div className="main-register__input">
                  <input
                    className="form-control border-primary text-dark rounded p-2"
                    type="login"
                  />
                </div>
                <div className="main-register__text text-center mt-3">
                  <p>password</p>
                </div>
                <div className="main-register__input ">
                  <input
                    className="form-control border-primary rounded p-2"
                    type="password"
                  />
                </div>
              </div>
            </div>
            <div className="main-register__buttonLogin mt-2">
              <div className="main-buttonLogin__button text-center">
                <button className="btn btn-dark">Login</button>
              </div>
            </div>
          </div>

          {/* Форма для ввода значений */}
          <div className="main-input-form mt-4">
            <h2 className="text-center mb-4">Введите часы работы</h2>
            <div className="mb-2">
              <input
                type="date"
                value={dateInput}
                onChange={(e) => setDateInput(e.target.value)}
                className="form-control mb-2"
              />
              <input
                type="number"
                value={teacherInput}
                onChange={(e) => setTeacherInput(Number(e.target.value))}
                className="form-control mb-2"
                placeholder="Часы Преподавателя"
              />
              <input
                type="number"
                value={assistantInput}
                onChange={(e) => setAssistantInput(Number(e.target.value))}
                className="form-control mb-2"
                placeholder="Часы Помощника"
              />
              <button className="btn btn-primary" onClick={handleAddEntries}>
                Добавить часы
              </button>
            </div>
          </div>

          <div className="main-office mt-4">
            <h2 className="text-center mb-4">Расписание на {monthName}</h2>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th className="unsetALL"></th>
                  {daysInMonth.map((day, index) => (
                    <th className="text-uppercase" key={index}>
                      {day.dayName}
                    </th>
                  ))}
                </tr>
                <tr>
                  <th className="unsetALL"></th>
                  {daysInMonth.map((day, index) => (
                    <th key={index}>{day.date}</th>
                  ))}
                  <th>Часы</th>
                  <th>Зарплата</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>Преподаватель</th>
                  {entries.map((entry, index) => (
                    <td key={index}>{entry.teacher}</td>
                  ))}
                  <td rowSpan={2}>{totalHours}</td>
                  <td rowSpan={2}>{salary}</td>
                </tr>
                <tr>
                  <th>Помощник</th>
                  {entries.map((entry, index) => (
                    <td key={index}>{entry.assistant}</td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </>
  );
}

export default App;
