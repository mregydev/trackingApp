import { io, Socket } from 'socket.io-client';
import { Vehicle } from '../types';

let socket: Socket | null = null;

export const getDALInstance = () => {
  if (!socket) {
    socket = io(import.meta.env.VITE_SOCKET_URL, {
      transports: ['websocket'],
    });
  }

  return {
    onVehicleUpdate: (callBack: (arg: Vehicle) => void) => {
      socket?.on('vehicleUpdate', (vechile: Vehicle) => {
        callBack(vechile);
      });
    },
    onConnect: (callBack: () => void) => {
      socket?.on('connect', () => {
        callBack();
      });
    },
    onDisConnect: (callBack: () => void) => {
      socket?.on('disconnect', () => {
        callBack();
      });
    },
    releaseHandlers: () => {
      socket?.off('vehicleUpdate');
      socket?.off('connect');
      socket?.off('disconnect');
    },
  };
};
