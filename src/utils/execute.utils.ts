import { exec } from "child_process";

export const deployContractIgnition = (contractName: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        const command = `npx hardhat ignition deploy ./ignition/modules/${contractName}.ignition.ts --network localganache`;
        const childProcess = exec(command);
        let outputData = '';

        childProcess.stdout.on('data', (data) => {
            const output = data.toString();
            console.log(output);
            outputData += output;
            childProcess.stdin.write('y\n');
        });

        childProcess.on('close', (code) => {
            console.log(`Quá trình đã kết thúc với mã trạng thái ${code}`);
            if (code === 0) {
                resolve(outputData); // Trả về đầu ra khi quá trình thành công
            } else {
                reject(new Error(`Quá trình kết thúc với mã trạng thái ${code}`)); // Trả về lỗi khi quá trình kết thúc với mã lỗi
            }
        });

        childProcess.on('error', (error) => {
            console.error('Lỗi khi thực thi lệnh:', error);
            reject(error); // Trả về lỗi khi có lỗi xảy ra trong quá trình thực thi lệnh
        });
    });
};
