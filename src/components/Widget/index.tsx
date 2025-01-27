import {
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Slide,
} from '@mui/material';
import React, { ReactNode } from 'react';

import { AppState, minimizeWidget } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import { Rnd } from 'react-rnd';
import styles from './style.module.scss';
import { HighlightOff } from '@mui/icons-material';
import { useMap } from 'react-leaflet';

export interface WidgetProps {
  id: string;
  children: ReactNode;
  title: string;
  width?: number;
  height?: number;
}

const Widget = React.memo(
  ({ children, title, width = 200,height=400, id }: WidgetProps) => {
    const dispatch = useDispatch();
    const map=useMap();
    const minimizeClickHandler = (event: React.MouseEvent) => {
      event.preventDefault();
      dispatch(minimizeWidget({ widgetId: id, widgetTitle: title }));
    };

    const isDarkMode = useSelector((state: AppState) => state.isDarkMode);

    const minizedWidgets = useSelector(
      (state: AppState) => state.minizedWidgets
    );

    const disbaleMapDragging=()=>{
      map.dragging.disable();
      map.scrollWheelZoom.disable();
    }

    

    const enableMapDragging=()=>{
      map.dragging.enable();
      map.scrollWheelZoom.enable();
    }

    const preventScrollPropagation = (event: React.WheelEvent) => {
      event.stopPropagation(); 
    };

    return (
      <Rnd
        className={styles.widget}
        style={{ display: !minizedWidgets[id] ? 'block' : 'none' }}
        default={{ height, width, x: 0, y: 0 }}
        onResize={disbaleMapDragging}
        onResizeStop={enableMapDragging}
        onMouseDown={disbaleMapDragging}
        onMouseLeave={enableMapDragging}
      >
        {!minizedWidgets[id] && (
          <Slide
            style={{ width: `${width}px`, height: '100%', margin: 0 }}
            direction='up'
            in
          >
            <Card className={styles.widgetCard}>
              <CardHeader
                action={
                  <IconButton
                    onClick={minimizeClickHandler}
                    aria-label='minimize'
                  >
                    <span className={styles.minimize}>
                      <HighlightOff fontSize='medium' />
                    </span>
                  </IconButton>
                }
                className={`card__header ${
                  isDarkMode ? 'dark-mode' : 'light-mode'
                }`}
                title={title}
              ></CardHeader>
              <CardContent
                style={{ maxHeight: height }}
                className={styles.widgetContent}
                onMouseDown={disbaleMapDragging}
                onMouseLeave={enableMapDragging}
                onWheel={preventScrollPropagation} 
              >
                {children}
              </CardContent>
            </Card>
          </Slide>
        )}
      </Rnd>
    );
  }
);

export default Widget;
