import { useState, useEffect } from "react";
import { TaskAPI } from "./TaskAPI";

export const useTasks = ({ taskableId, taskableType }) => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    TaskAPI.fetchTasks(taskableId, taskableType, { include: "all" })
      .then(setTasks)
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [taskableId, taskableType]);

  return { tasks, error, loading };
};

export const useTask = ({ taskableId, taskId, taskableType }) => {
  console.log(taskableId, taskId, taskableType);
  const [task, setTask] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!taskableId || !taskId) return; // Guard against missing taskableId or taskId
    
    TaskAPI.fetchTask(taskableId, taskId, taskableType, { include: "all" })
      .then(setTask)
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [taskableId, taskId]);
  console.log(task, error, loading);
  return { task, error, loading };
};
