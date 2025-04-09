import { useState, useEffect } from "react";
import { TaskAPI } from "./TaskAPI";

export const useTasks = ({ taskableId, taskableType, include = "" }) => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    TaskAPI.fetchTasks(taskableId, taskableType, include )
      .then((fetchedTasks) => setTasks(fetchedTasks))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [taskableId, taskableType, include]);

  return { tasks, error, loading };
};

export const useTask = ({ taskableId, taskId, taskableType, include = "" }) => {
  const [task, setTask] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!taskableId || !taskId) return;

    TaskAPI.fetchTask(taskableId, taskId, taskableType, include)
      .then((fetchedTask) => setTask(fetchedTask))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [taskableId, taskId, taskableType, include]);

  return { task, error, loading };
};
