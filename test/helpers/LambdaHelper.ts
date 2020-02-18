import { Lambda } from 'aws-sdk';
import execa from 'execa';

export default class LambdaHelper {
    static async invoke(functionName: string, payload: string) {
        // const command = `invoke local -f ${functionName} --data '${payload}'`;
        // const { stdout } = await execa('sls', [command]);

        // console.log(stdout);

        // return stdout;
    }
}