import { exec } from 'child_process'

export const deployContractIgnition = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    const command = `npx hardhat ignition deploy ./ignition/modules/SupplyChain.ignition.ts --network localganache`
    const childProcess = exec(command)
    let outputData = ''

    childProcess.stdout.on('data', (data) => {
      const output = data.toString()
      console.log(output)
      outputData += output
      childProcess.stdin.write('y\n')
    })

    childProcess.on('close', (code) => {
      console.log(`Quá trình đã kết thúc với mã trạng thái ${code}`)
      if (code === 0) {
        resolve(outputData)
      } else {
        reject(new Error(`Quá trình kết thúc với mã trạng thái ${code}`))
      }
    })

    childProcess.on('error', (error) => {
      console.error('Lỗi khi thực thi lệnh:', error)
      reject(error)
    })
  })
}
