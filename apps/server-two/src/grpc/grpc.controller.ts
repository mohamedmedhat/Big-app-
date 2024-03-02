import { Controller } from '@nestjs/common';
import { GrpcService } from './grpc.service';
import { GrpcMethod } from '@nestjs/microservices';
import { CreateRequest, CreateResponse, ReadRequest, ReadResponse, UpdateRequest, UpdateResponse, DeleteRequest, DeleteResponse } from './generated/service_pb';


@Controller('grpc')
export class GrpcController {
  constructor(private readonly grpcService: GrpcService) {}

  @GrpcMethod('GRPCService', 'Create')
  async create(request: CreateRequest): Promise<CreateResponse> {
    const entity = await this.grpcService.create(request);
    const response = new CreateResponse();
    response.setId(entity._id);
    return response;
  }

  @GrpcMethod('GRPCService', 'Read')
  async read(request: ReadRequest): Promise<ReadResponse> {
    const id = request.getId();
    const entity = await this.grpcService.read(id);
    const response = new ReadResponse();
    if (entity) {
      response.setName(entity.name);
      response.setDesc(entity.desc);
    }
    return response;
  }

  @GrpcMethod('GRPCService', 'Update')
  async update(request: UpdateRequest): Promise<UpdateResponse> {
    const id = request.getId();
    const newName = request.getAll();
    await this.grpcService.update(id, newName);
    return new UpdateResponse();
  }

  @GrpcMethod('GRPCService', 'Delete')
  async delete(request: DeleteRequest): Promise<DeleteResponse> {
    const id = request.getId();
    await this.grpcService.delete(id);
    return new DeleteResponse();
  }
}
