import React from 'react';
import { connect } from 'dva'
import pathToRegexp from 'path-to-regexp';
import RenderAuthorized from '@/components/authorized';
import Policy, { IAction, IPolicyData } from '@/components/authorized/police';
import PageLoading from '@/components/pageLoading';
import Exception403 from '@/pages/exception/403';
import { ConnectProps } from '@/models/connect';