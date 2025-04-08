import { useState, useEffect } from "react";
import { TaskAPI } from "./TaskAPI";

export const useTasks = ({ projectId }) => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    TaskAPI.fetchTasks(projectId, { include: "all" })
      .then(setTasks)
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [projectId]);

  return { tasks, error, loading };
};

export const useTask = ({ projectId, taskId }) => {
  const [task, setTask] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!projectId || !taskId) return; // Guard against missing projectId or taskId

    TaskAPI.fetchTask(projectId, taskId, { include: "all" })
      .then(setTask)
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [projectId, taskId]);

  console.log(task);

  return { task, error, loading };
};
