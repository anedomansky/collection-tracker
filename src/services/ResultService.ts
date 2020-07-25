import { IResultService } from '@/interfaces/IResultService';

class ResultService implements IResultService {
    private static instance: IResultService;

    static getInstance(): ResultService {
        if (!ResultService.instance) {
            ResultService.instance = new ResultService();
        }
        return ResultService.instance;
    }
}

export default ResultService;
