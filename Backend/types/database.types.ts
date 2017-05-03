declare type TProtoBuffer = (Parameters: {
    argument: any | Buffer,
    encode?: boolean,
    decode?: boolean
}) => Promise<any> | Promise<Buffer>