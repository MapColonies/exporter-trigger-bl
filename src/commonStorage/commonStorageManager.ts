import { injectable } from 'tsyringe';
import { MCLogger } from '@map-colonies/mc-logger';
import Axios, { AxiosResponse } from 'axios';
import { get } from 'config';
import Urls from '../requests/urls';
import { ICommonStorageConfig } from '../model/commonStorageConfig';
import { IExportData } from '../model/exportRequest';
import {
  IExportStatusResponse,
  createStatusResponseBody,
} from '../model/exportStatusRequest';
import { GetStatusError, SaveExportDataError } from '../requests/errors/status';

@injectable()
export class CommonStorageManager {
  protected config: ICommonStorageConfig;

  public constructor(private readonly logger: MCLogger) {
    this.config = get('commonStorage');
    logger.info(
      `Status manager created. url=${this.config.url}, index=${this.config.index}`
    );
  }

  public async getGeopackageExecutionStatus(): Promise<IExportStatusResponse> {
    this.logger.debug('Getting geopackage export status');

    try {
      const res: AxiosResponse<IExportStatusResponse> = await Axios.get(
        Urls.commonStorage.getExportStatusLink
      );
      const status: IExportStatusResponse = res.data;
      this.logger.debug(
        `Got export status from CommonStorage. Status: ${JSON.stringify(
          status
        )}`
      );
      return status;
    } catch (error) {
      throw new GetStatusError(error);
    }
  }

  public async saveExportData(exportData: IExportData): Promise<void> {
    this.logger.debug('Saving new export data.');

    try {
      await Axios.post(Urls.commonStorage.saveExportDataLink, {
        body: createStatusResponseBody(exportData),
        params: {
          taskId: exportData.taskId,
        },
      });
    } catch (error) {
      throw new SaveExportDataError(error, exportData);
    }

    this.logger.debug(`Saved export data. Data: ${JSON.stringify(exportData)}`);
  }
}
